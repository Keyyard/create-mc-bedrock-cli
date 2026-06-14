import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getLatestVersion } from './registryService.js';
import { updateManifestFiles } from './manifestService.js';

/**
 * Files inside the bundled template that contain placeholders we need to
 * substitute. Anything not listed here is copied byte-for-byte (which is
 * what we want for binary assets like pack_icon.png).
 *
 * The manifests (`packs/BP/manifest.json`, `packs/RP/manifest.json`) are
 * intentionally NOT in this list — `updateManifestFiles` rewrites them
 * authoritatively after the copy.
 */
const TEXT_SUBSTITUTION_FILES = new Set([
  'config.json',
  'package.json',
  'README.md'
]);

/**
 * npm packages whose latest stable version we resolve at scaffold time and
 * bake into the generated `package.json`. `@keyyard/bedrock-build` may not
 * be published yet during 2.0 development; it has a permissive fallback.
 */
const VERSION_PACKAGES = [
  { name: '@minecraft/server', fallback: '^1.19.0' },
  { name: '@minecraft/server-ui', fallback: '^1.4.0' },
  { name: '@keyyard/bedrock-build', fallback: '^0.1.0' },
  { name: 'typescript', fallback: '^5.6.0' }
];

/**
 * Scaffold the bundled Custom Workspace into `destination`.
 *
 *  1. Recursively copy `cli/src/templates/custom/` to `destination`.
 *  2. Fetch latest npm versions for the runtime/dev deps.
 *  3. Replace `{{PROJECT_NAME}}` and `{{VERSION:<pkg>}}` placeholders in
 *     known text files.
 *  4. Regenerate manifest UUIDs and header names via `updateManifestFiles`.
 *
 * @param {string} destination  absolute or cwd-relative destination dir
 * @param {string} projectName  goes into config.json, package.json, manifests
 * @param {'typescript'|'javascript'} [language='typescript']  entry language
 */
export async function scaffoldCustom(destination, projectName, language = 'typescript') {
  const templateDir = resolveTemplateDir();
  const targetDir = path.resolve(destination);

  await fs.mkdir(targetDir, { recursive: true });

  // Recursive copy — Node 18+ has fs.cp with `recursive`.
  // `force: true` so re-scaffolds into an existing dir overwrite stale files.
  await fs.cp(templateDir, targetDir, { recursive: true, force: true });

  // Resolve latest versions in parallel.
  console.log('Resolving latest dependency versions from npm registry...');
  const resolved = await Promise.all(
    VERSION_PACKAGES.map(async ({ name, fallback }) => [
      name,
      await getLatestVersion(name, fallback)
    ])
  );
  const versionMap = Object.fromEntries(resolved);

  // Substitute placeholders in known text files.
  await substitutePlaceholders(targetDir, projectName, versionMap);

  // The template ships TypeScript by default. Convert in place when JS is asked.
  if (language === 'javascript') {
    await applyJavascriptVariant(targetDir);
  }

  // Regenerate manifest UUIDs + header names.
  await updateManifestFiles(targetDir, projectName);

  console.log('Custom Workspace scaffolded successfully.');
}

/**
 * Make JavaScript the starter language. The workspace supports BOTH languages
 * either way (the bundled `tsconfig.json` has `allowJs`, and esbuild bundles a
 * mixed .ts/.js import graph); this only swaps the example entry file so a JS
 * picker opens to `main.js` instead of `main.ts`:
 *  - rename `src/main.ts` -> `src/main.js` (the template entry has no type
 *    annotations, so the content is already valid JS)
 *  - point `config.json`'s `bedrock-cli.entry` at `src/main.js`
 *  - update the `main.ts` mention in `README.md`
 *
 * `tsconfig.json` and the `typescript` dep are intentionally KEPT so the same
 * workspace can also hold `.ts` files with full editor/type support.
 *
 * @param {string} targetDir  absolute scaffold root
 */
async function applyJavascriptVariant(targetDir) {
  const tsEntry = path.join(targetDir, 'src', 'main.ts');
  const jsEntry = path.join(targetDir, 'src', 'main.js');
  await fs.rename(tsEntry, jsEntry).catch(async (err) => {
    if (err.code !== 'ENOENT') throw err;
  });

  await editJson(path.join(targetDir, 'config.json'), (cfg) => {
    if (cfg['bedrock-cli'] && typeof cfg['bedrock-cli'] === 'object') {
      cfg['bedrock-cli'].entry = 'src/main.js';
    }
    return cfg;
  });

  await editText(path.join(targetDir, 'README.md'), (md) =>
    md.replaceAll('src/main.ts', 'src/main.js').replaceAll('main.ts ', 'main.js ')
  );
}

/** Read, transform, and write back a JSON file (2-space indent). */
async function editJson(filePath, transform) {
  let raw;
  try {
    raw = await fs.readFile(filePath, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') return;
    throw err;
  }
  const next = transform(JSON.parse(raw));
  await fs.writeFile(filePath, JSON.stringify(next, null, 2) + '\n', 'utf8');
}

/** Read, transform, and write back a text file. */
async function editText(filePath, transform) {
  let raw;
  try {
    raw = await fs.readFile(filePath, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') return;
    throw err;
  }
  await fs.writeFile(filePath, transform(raw), 'utf8');
}

/**
 * Locate `cli/src/templates/custom/` relative to this file. Works for both
 * a local checkout and an npm-installed copy under `node_modules/`.
 */
function resolveTemplateDir() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  // here === <pkg>/src/services
  // template === <pkg>/src/templates/custom
  return path.resolve(here, '..', 'templates', 'custom');
}

async function substitutePlaceholders(targetDir, projectName, versionMap) {
  for (const relFile of TEXT_SUBSTITUTION_FILES) {
    const filePath = path.join(targetDir, relFile);
    let content;
    try {
      content = await fs.readFile(filePath, 'utf8');
    } catch (err) {
      // README.md and similar may not exist in every layout — skip silently.
      if (err.code === 'ENOENT') continue;
      throw err;
    }

    content = content.replaceAll('{{PROJECT_NAME}}', projectName);

    // Replace every {{VERSION:<pkg>}} that we have a resolved value for.
    content = content.replace(/\{\{VERSION:([^}]+)\}\}/g, (match, pkg) => {
      const version = versionMap[pkg];
      if (version) return version;
      // Leave unknown tokens visible so misconfiguration is obvious.
      return match;
    });

    await fs.writeFile(filePath, content, 'utf8');
  }
}
