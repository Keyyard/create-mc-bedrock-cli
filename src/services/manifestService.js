import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function updateManifestFiles(destination, userInputName) {
  // Find manifest paths dynamically
  const manifestPaths = [];

  // --- Standard structure: behavior_packs/<subfolder>/manifest.json ---
  const bpDir = path.join(destination, 'behavior_packs');
  try {
    const bpEntries = await fs.readdir(bpDir, { withFileTypes: true });
    const bpFolder = bpEntries.find(entry => entry.isDirectory());
    if (bpFolder) {
      manifestPaths.push(path.join(bpDir, bpFolder.name, 'manifest.json'));
    }
  } catch {
    // behavior_packs folder doesn't exist, skip
  }

  // --- Standard structure: resource_packs/<subfolder>/manifest.json ---
  const rpDir = path.join(destination, 'resource_packs');
  try {
    const rpEntries = await fs.readdir(rpDir, { withFileTypes: true });
    const rpFolder = rpEntries.find(entry => entry.isDirectory());
    if (rpFolder) {
      manifestPaths.push(path.join(rpDir, rpFolder.name, 'manifest.json'));
    }
  } catch {
    // resource_packs folder doesn't exist, skip
  }

  // --- Regolith structure: BP/manifest.json and RP/manifest.json ---
  const flatBpManifest = path.join(destination, 'BP', 'manifest.json');
  const flatRpManifest = path.join(destination, 'RP', 'manifest.json');
  try {
    await fs.access(flatBpManifest);
    if (!manifestPaths.includes(flatBpManifest)) manifestPaths.push(flatBpManifest);
  } catch { /* not present */ }
  try {
    await fs.access(flatRpManifest);
    if (!manifestPaths.includes(flatRpManifest)) manifestPaths.push(flatRpManifest);
  } catch { /* not present */ }

  // Generate UUIDs for BP and RP headers to maintain dependency relationship
  const bpHeaderUuid = uuidv4();
  const rpHeaderUuid = uuidv4();

  for (const manifestPath of manifestPaths) {
    try {
      const manifestExists = await fs.access(manifestPath).then(() => true).catch(() => false);
      if (!manifestExists) continue;

      const manifestContent = JSON.parse(await fs.readFile(manifestPath, 'utf-8'));
      // Works for both standard (behavior_packs/...) and Regolith (BP/) structures
      const isBehaviorPack = manifestPath.includes('behavior_packs') ||
        manifestPath.replace(/\\/g, '/').endsWith('/BP/manifest.json');

      // Update header UUID
      manifestContent.header.uuid = isBehaviorPack ? bpHeaderUuid : rpHeaderUuid;

      // Update module UUIDs
      if (manifestContent.modules) {
        manifestContent.modules.forEach(module => {
          module.uuid = uuidv4();
          module.description = `Generated from npx create-mc-bedrock`;
        });
      }

      // Update dependencies - maintain the cross-reference pattern
      if (manifestContent.dependencies) {
        manifestContent.dependencies.forEach(dep => {
          if (dep.uuid) {
            // BP should depend on RP header UUID, RP should depend on BP header UUID
            dep.uuid = isBehaviorPack ? rpHeaderUuid : bpHeaderUuid;
          }
        });
      }

      // Update name and description based on user input and type (RP/BP)
      const type = isBehaviorPack ? 'BP' : 'RP';
      manifestContent.header.name = `${userInputName} ${type}`;
      manifestContent.header.description = `Generated from npx create-mc-bedrock`;

      // Write updated manifest back to file
      await fs.writeFile(manifestPath, JSON.stringify(manifestContent, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Error updating manifest at ${manifestPath}:`, error.message);
    }
  }
}
