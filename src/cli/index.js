#!/usr/bin/env node
import path from 'path';
import fs from 'fs/promises';
import { displayAsciiArt } from '../utils/logger.js';
import {
  promptLanguage,
  promptProjectName,
  promptDestination,
  promptAutoInstall
} from './commands.js';
import { scaffoldCustom } from '../services/customTemplateService.js';
import { runNpmInstall } from '../services/installService.js';

async function run() {
  await displayAsciiArt();

  let destination;

  try {
    // 1) Project name (used everywhere)
    const projectName = await promptProjectName();

    // 2) Destination (defaults to ./<projectName>)
    const defaultDest = `./${projectName}`;
    destination = await promptDestination(defaultDest);
    const targetPath = path.resolve(destination);

    // 3) Language (TS / JS)
    const language = await promptLanguage();

    // 4) Scaffold the single opinionated starter.
    await scaffoldCustom(targetPath, projectName, language);

    // 5) Auto-install prompt.
    const hasPackageJson = await fileExists(path.join(targetPath, 'package.json'));
    if (hasPackageJson) {
      const wantInstall = await promptAutoInstall();
      if (wantInstall) {
        console.log('Running npm install...');
        const code = await runNpmInstall(targetPath);
        if (code !== 0) {
          console.error(
            `npm install exited with code ${code}. You can re-run it manually with:\n  cd ${destination} && npm install`
          );
        }
      } else {
        console.log(`Skipping install. To install later:\n  cd ${destination} && npm install`);
      }
    }

    printNextSteps(destination);
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit(0);
  }
}

function printNextSteps(destination) {
  console.log('');
  console.log('Next steps:');
  console.log(`  cd ${destination}`);
  console.log('  npm run build          # dev bundle into dist/');
  console.log('  npm run watch          # rebuild on save');
  console.log('  npm run deploy         # one-shot deploy to local Minecraft (Windows)');
  console.log('  npm run deploy:watch   # rebuild + deploy on every save (hot reload)');
  console.log('  npm run pack           # release build + zip to .mcaddon');
  console.log('');
  console.log('Generate content (day 2):');
  console.log('  npm run create:weapon  # wires the BP item + RP texture/lang in one shot');
  console.log('  npm run create:tool    # pickaxe / axe / shovel / hoe');
  console.log('  npm run create:armor   # helmet / chestplate / leggings / boots');
  console.log('  npm run create:item    # generic item');
  console.log('  npm run create:entity  # BP + RP entity pair');
  console.log('  npm run create:block   # block + terrain/blocks/lang registration');
  console.log('');
  console.log('Docs: https://bedrockcli.keyyard.xyz/docs');
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

run();
