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
  'bedrock.config.json',
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
 * @param {string} projectName  goes into bedrock.config.json, package.json, manifests
 */
export async function scaffoldCustom(destination, projectName) {
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

  // Regenerate manifest UUIDs + header names.
  await updateManifestFiles(targetDir, projectName);

  console.log('Custom Workspace scaffolded successfully.');
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
