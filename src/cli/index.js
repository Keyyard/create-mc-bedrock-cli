#!/usr/bin/env node
import path from 'path';
import fs from 'fs/promises';
import { displayAsciiArt } from '../utils/logger.js';
import {
  fetchSamples,
  getSamples,
  sources
} from '../services/gitService.js';
import {
  promptSource,
  promptProjectName,
  promptDestination,
  promptCategory,
  promptTemplate,
  promptSample,
  promptAutoInstall
} from './commands.js';
import { moveSample } from '../services/fileService.js';
import { updateManifestFiles } from '../services/manifestService.js';
import { scaffoldCustom } from '../services/customTemplateService.js';
import { runNpmInstall } from '../services/installService.js';
import { cleanupTempFiles } from '../utils/helpers.js';

async function run() {
  await displayAsciiArt();

  let scaffolded = false;
  let targetPath;
  let chosenSource;
  let projectName;

  try {
    await cleanupTempFiles();

    // 1) Source
    const { source } = await promptSource();
    chosenSource = source;

    // 2) Project name (used everywhere)
    projectName = await promptProjectName();

    // 3) Destination (defaults to ./<projectName>)
    const defaultDest = `./${projectName}`;
    const destination = await promptDestination(defaultDest);
    targetPath = path.resolve(destination);

    if (source === 'custom') {
      // Bundled Custom Workspace path — no remote fetch needed.
      await scaffoldCustom(targetPath, projectName);
      scaffolded = true;
    } else {
      // Microsoft / Community: remote fetch first.
      await fetchSamples(source);

      let samplePath;
      if (source === 'community') {
        const category = await promptCategory();
        const template = await promptTemplate(category);
        const repoRoot = sources.community.repoRoot || './temp-repo-community';
        samplePath = path.join(repoRoot, category, template);
      } else {
        // microsoft
        const samples = await getSamples('microsoft');
        if (samples.length === 0) {
          console.error('No samples found in the repository.');
          return;
        }
        const sample = await promptSample(samples);
        const repoRoot = sources.microsoft.repoRoot || './temp-repo-microsoft';
        samplePath = path.join(repoRoot, sample);
      }

      await moveSample(samplePath, targetPath);
      await updateManifestFiles(targetPath, projectName);
      scaffolded = true;
    }

    // 4) Auto-install prompt — only for projects that have a package.json
    //    sitting at the root of the scaffolded output.
    const hasPackageJson = await fileExists(path.join(targetPath, 'package.json'));
    if (scaffolded && hasPackageJson) {
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

    printNextSteps(source, destination);
  } catch (error) {
    console.error(error.message);
  } finally {
    await cleanupTempFiles();
    process.exit(0);
  }
}

function printNextSteps(source, destination) {
  console.log('');
  console.log('Next steps:');
  console.log(`  cd ${destination}`);
  if (source === 'custom') {
    console.log('  npm run watch          # bundle & rebuild on save');
    console.log('  npm run deploy:watch   # hot-reload to Minecraft Bedrock (Windows retail)');
    console.log('  npm run pack           # produce a shareable .mcaddon');
    console.log('');
    console.log('Docs: https://bedrockcli.keyyard.xyz/docs');
  } else {
    console.log('  # Open in your editor and follow the sample\'s README.');
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

run();
