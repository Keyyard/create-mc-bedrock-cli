import fs from 'fs/promises';
import path from 'path';

/**
 * Restructures a scaffolded Bedrock project to be Regolith-compatible.
 *
 * What it does:
 *  1. Flattens behavior_packs/<name>/ → BP/
 *  2. Flattens resource_packs/<name>/ → RP/
 *  3. Writes config.json with the correct Regolith schema
 *  4. Creates data/ and .regolith/ directories
 *  5. Writes a .gitignore that excludes /build and /.regolith
 *
 * @param {string} destination  Absolute path to the project root
 * @param {string} projectName  The name the user gave the project
 * @param {string} author       Author name (defaults to 'Unknown')
 */
export async function applyRegolithStructure(destination, projectName, author = 'Unknown') {
  // 1. Flatten behavior_packs/<subfolder>/ → BP/
  await flattenPackFolder(destination, 'behavior_packs', 'BP');

  // 2. Flatten resource_packs/<subfolder>/ → RP/
  await flattenPackFolder(destination, 'resource_packs', 'RP');

  // 3. Create data/ directory (Regolith filter data lives here)
  await fs.mkdir(path.join(destination, 'data'), { recursive: true });

  // 4. Create .regolith/ directory (Regolith cache, git-ignored)
  await fs.mkdir(path.join(destination, '.regolith'), { recursive: true });

  // 5. Write config.json
  const config = buildRegolithConfig(projectName, author);
  await fs.writeFile(
    path.join(destination, 'config.json'),
    JSON.stringify(config, null, 2),
    'utf-8'
  );

  // 6. Write .gitignore (Regolith standard)
  const gitignorePath = path.join(destination, '.gitignore');
  let existing = '';
  try {
    existing = await fs.readFile(gitignorePath, 'utf-8');
  } catch {
    // file doesn't exist yet — that's fine
  }
  const regolithIgnore = '/build\n/.regolith\n';
  if (!existing.includes('/.regolith')) {
    await fs.writeFile(gitignorePath, existing + regolithIgnore, 'utf-8');
  }

  console.log('✅ Regolith project structure applied!');
  console.log('   • BP/         ← your behavior pack source');
  console.log('   • RP/         ← your resource pack source');
  console.log('   • data/       ← filter data folder');
  console.log('   • config.json ← Regolith configuration');
  console.log('   ℹ  Run `regolith init` is NOT needed — config.json is already generated.');
  console.log('   ℹ  Add filters to config.json → regolith.filterDefinitions, then run `regolith install-all`.');
}

/**
 * Moves the first subfolder of `behavior_packs/` or `resource_packs/`
 * to a flat `BP/` or `RP/` at the project root, then removes the now-empty
 * nested directory.
 */
async function flattenPackFolder(destination, nestedDir, flatDir) {
  const nestedPath = path.join(destination, nestedDir);
  const flatPath = path.join(destination, flatDir);

  try {
    const entries = await fs.readdir(nestedPath, { withFileTypes: true });
    const subfolder = entries.find(e => e.isDirectory());

    if (subfolder) {
      const subfolderPath = path.join(nestedPath, subfolder.name);
      // Move subfolder contents to flatDir
      await moveDirectory(subfolderPath, flatPath);
      // Remove the now-empty nested pack folder
      await fs.rm(nestedPath, { recursive: true, force: true });
    } else {
      // No subfolder found — just rename the root pack dir
      await fs.rename(nestedPath, flatPath);
    }
  } catch (err) {
    // nestedDir doesn't exist (template may not have one), create empty flatDir
    console.warn(`  ⚠ ${nestedDir} not found — creating empty ${flatDir}/`);
    await fs.mkdir(flatPath, { recursive: true });
  }
}

/**
 * Recursively moves all contents of src into dest.
 */
async function moveDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await moveDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

/**
 * Builds the Regolith config.json object.
 * Matches the schema from regolith/regolith/config.go.
 */
function buildRegolithConfig(projectName, author) {
  return {
    name: projectName,
    author: author,
    packs: {
      behaviorPack: './BP',
      resourcePack: './RP'
    },
    regolith: {
      formatVersion: '1.4.0',
      dataPath: './data',
      profiles: {
        default: {
          export: {
            target: 'development'
          },
          filters: []
        }
      },
      filterDefinitions: {}
    }
  };
}
