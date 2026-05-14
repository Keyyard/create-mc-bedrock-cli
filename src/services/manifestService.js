import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * Regenerate UUIDs and rewrite the BP/RP manifest headers for the project at
 * `destination`. Auto-detects the on-disk pack layout in this order:
 *
 *   1. `packs/BP` + `packs/RP`               — Custom Workspace / Regolith-style
 *   2. `BP/` + `RP/` at project root          — Community Templates style
 *   3. `behavior_packs/<first>` + `resource_packs/<first>` — Microsoft samples
 *
 * Cross-references are preserved: every BP dependency UUID (when present) is
 * pointed at the new RP header UUID, and vice versa.
 *
 * @param {string} destination       project root to walk
 * @param {string} userInputName     used for `<name> BP` / `<name> RP` header names
 */
export async function updateManifestFiles(destination, userInputName) {
  const layout = await detectPackLayout(destination);

  const manifestPaths = [];
  if (layout.bp) manifestPaths.push({ filePath: layout.bp, isBehaviorPack: true });
  if (layout.rp) manifestPaths.push({ filePath: layout.rp, isBehaviorPack: false });

  if (manifestPaths.length === 0) {
    // Nothing to do — caller may have scaffolded a non-standard layout.
    return;
  }

  // Generate matched header UUIDs so we can wire BP<->RP dependencies in one pass.
  const bpHeaderUuid = uuidv4();
  const rpHeaderUuid = uuidv4();

  for (const { filePath, isBehaviorPack } of manifestPaths) {
    try {
      const exists = await fs
        .access(filePath)
        .then(() => true)
        .catch(() => false);
      if (!exists) continue;

      const manifest = JSON.parse(await fs.readFile(filePath, 'utf-8'));

      // Header UUID
      if (manifest.header) {
        manifest.header.uuid = isBehaviorPack ? bpHeaderUuid : rpHeaderUuid;
        manifest.header.name = `${userInputName} ${isBehaviorPack ? 'BP' : 'RP'}`;
        manifest.header.description = 'Generated from npx create-mc-bedrock';
      }

      // Module UUIDs — fresh for each module
      if (Array.isArray(manifest.modules)) {
        manifest.modules.forEach((mod) => {
          mod.uuid = uuidv4();
          mod.description = 'Generated from npx create-mc-bedrock';
        });
      }

      // Dependencies — only rewrite UUID-shaped entries (skip `module_name` deps
      // like `@minecraft/server` which use a semver `version` and no UUID).
      if (Array.isArray(manifest.dependencies)) {
        manifest.dependencies.forEach((dep) => {
          if (dep && typeof dep === 'object' && typeof dep.uuid === 'string') {
            dep.uuid = isBehaviorPack ? rpHeaderUuid : bpHeaderUuid;
          }
        });
      }

      await fs.writeFile(filePath, JSON.stringify(manifest, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Error updating manifest at ${filePath}:`, error.message);
    }
  }
}

/**
 * Walk known layouts and return absolute(ish) paths to the BP + RP manifest.json.
 * Either or both may be undefined if the layout doesn't match.
 * @param {string} root
 * @returns {Promise<{bp?: string, rp?: string}>}
 */
async function detectPackLayout(root) {
  // 1. Custom Workspace: packs/BP + packs/RP
  const customBp = path.join(root, 'packs', 'BP', 'manifest.json');
  const customRp = path.join(root, 'packs', 'RP', 'manifest.json');
  if ((await fileExists(customBp)) || (await fileExists(customRp))) {
    return {
      bp: (await fileExists(customBp)) ? customBp : undefined,
      rp: (await fileExists(customRp)) ? customRp : undefined
    };
  }

  // 2. Community Templates: BP/ + RP/ directly under root
  const cmBp = path.join(root, 'BP', 'manifest.json');
  const cmRp = path.join(root, 'RP', 'manifest.json');
  if ((await fileExists(cmBp)) || (await fileExists(cmRp))) {
    return {
      bp: (await fileExists(cmBp)) ? cmBp : undefined,
      rp: (await fileExists(cmRp)) ? cmRp : undefined
    };
  }

  // 3. Microsoft layout: behavior_packs/<first>/manifest.json, resource_packs/<first>/manifest.json
  const bpDir = path.join(root, 'behavior_packs');
  const rpDir = path.join(root, 'resource_packs');
  const bp = await firstSubfolderManifest(bpDir);
  const rp = await firstSubfolderManifest(rpDir);
  return { bp, rp };
}

async function firstSubfolderManifest(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const sub = entries.find((e) => e.isDirectory());
    if (!sub) return undefined;
    const manifestPath = path.join(dir, sub.name, 'manifest.json');
    return (await fileExists(manifestPath)) ? manifestPath : undefined;
  } catch (_err) {
    return undefined;
  }
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}
