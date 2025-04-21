#!/usr/bin/env node

import inquirer from 'inquirer';
import simpleGit from 'simple-git';
import path from 'path';
import fs, { mkdir } from 'fs/promises'; 
import { v4 as uuidv4 } from 'uuid';

class BedrockCLI {
  constructor() {
    this.samplesRepo = 'https://github.com/microsoft/minecraft-scripting-samples.git';
    this.tempRepoPath = './temp-repo';
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async displayAsciiArt() {
    const artLines = [
      "---",
      "",
      " ▄▄· ▄▄▄  ▄▄▄ . ▄▄▄· ▄▄▄▄▄▄▄▄ .    ▄▄▄▄· ▄▄▄ .·▄▄▄▄  ▄▄▄         ▄▄· ▄ •▄      ▄▄· ▄▄▌  ▪  ",
      "▐█ ▌▪▀▄ █·▀▄.▀·▐█ ▀█ •██  ▀▄.▀·    ▐█ ▀█▪▀▄.▀·██▪ ██ ▀▄ █·▪     ▐█ ▌▪█▌▄▌▪    ▐█ ▌▪██•  ██ ",
      "██ ▄▄▐▀▀▄ ▐▀▀▪▄▄█▀▀█  ▐█.▪▐▀▀▪▄    ▐█▀▀█▄▐▀▀▪▄▐█· ▐█▌▐▀▀▄  ▄█▀▄ ██ ▄▄▐▀▀▄·    ██ ▄▄██▪  ▐█·",
      "▐███▌▐█•█▌▐█▄▄▌▐█ ▪▐▌ ▐█▌·▐█▄▄▌    ██▄▪▐█▐█▄▄▌██. ██ ▐█•█▌▐█▌.▐▌▐███▌▐█.█▌    ▐███▌▐█▌▐▌▐█▌",
      "·▀▀▀ .▀  ▀ ▀▀▀  ▀  ▀  ▀▀▀  ▀▀▀     ·▀▀▀▀  ▀▀▀ ▀▀▀▀▀• .▀  ▀ ▀█▄▀▪·▀▀▀ ·▀  ▀    ·▀▀▀ .▀▀▀ ▀▀▀",
      "",
      "---",
      "by @keyyard - workspaces from Microsoft Minecraft Scripting Samples",
      "---",
    ];

    for (const line of artLines) {
      console.log(line);
      await this.sleep(100);
    }
  }

  async fetchSamples() {
    const git = simpleGit();
    console.log('Fetching available samples from Microsoft...');
    try {
      await git.clone(this.samplesRepo, this.tempRepoPath, ['--depth', '1']);
    } catch (error) {
      throw new Error(`Error fetching samples: ${error.message}`);
    }
  }

  async getSamples() {
    try {
      const entries = await fs.readdir(this.tempRepoPath, { withFileTypes: true });
      return entries
        .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
        .map(entry => ({ name: entry.name, value: entry.name }));
    } catch (error) {
      console.error('Error reading samples:', error.message);
      return [];
    }
  }

  async promptUser(samples) {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'sample',
        message: 'Select a sample to clone:',
        choices: samples
      },
      {
        type: 'input',
        name: 'destination',
        message: 'Enter the destination folder:',
        default: './'
      }
    ]);
  }

  async moveSample(samplePath, targetPath) {
    try {
      await mkdir(targetPath, { recursive: true });
      const entries = await fs.readdir(samplePath, { withFileTypes: true });

      for (const entry of entries) {
        const sourcePath = path.join(samplePath, entry.name);
        const destinationPath = path.join(targetPath, entry.name);

        if (entry.isDirectory()) {
          await this.moveSample(sourcePath, destinationPath);
        } else {
          await fs.copyFile(sourcePath, destinationPath);
        }
      }

      console.log('Sample workspace generated successfully!');
      console.log(`🎉 Your project is ready! To get started:
    1. Navigate to your project folder:
       cd ${targetPath}
    2. Open the project in your code editor:
       code .
    3. Start building your Minecraft Bedrock project! 🚀`);
    } catch (error) {
      throw new Error(`Error moving sample: ${error.message}`);
    }
  }

  async updateManifestFiles(destination, userInputName) {
    const manifestPaths = [
      path.join(destination, 'behavior_packs', 'starter', 'manifest.json'),
      path.join(destination, 'resource_packs', 'starter', 'manifest.json')
    ];

    for (const manifestPath of manifestPaths) {
      try {
        const manifestExists = await fs.access(manifestPath).then(() => true).catch(() => false);
        if (!manifestExists) continue;

        const manifestContent = JSON.parse(await fs.readFile(manifestPath, 'utf-8'));

        // Update UUIDs
        manifestContent.header.uuid = uuidv4();
        if (manifestContent.modules) {
          manifestContent.modules.forEach(module => {
            module.uuid = uuidv4();
            module.description = `Generated from npx create-mc-bedrock`;
          });
        }

        // Update name and description based on user input and type (RP/BP)
        const type = manifestPath.includes('behavior_packs') ? 'BP' : 'RP';
        manifestContent.header.name = `${userInputName} ${type}`;
        manifestContent.header.description = `Generated from npx create-mc-bedrock`;

        // Write updated manifest back to file
        await fs.writeFile(manifestPath, JSON.stringify(manifestContent, null, 2), 'utf-8');
      } catch (error) {
        console.error(`Error updating manifest at ${manifestPath}:`, error.message);
      }
    }
  }

  async cleanupTempFiles() {
    try {
      await fs.rm(this.tempRepoPath, { recursive: true, force: true });
    } catch (error) {
      console.error('Error cleaning up temporary files:', error.message);
    }
  }

  async run() {
    await this.displayAsciiArt();

    try {
      await this.cleanupTempFiles();
      await this.fetchSamples();
      const samples = await this.getSamples();

      if (samples.length === 0) {
        console.error('No samples found in the repository.');
        return;
      }

      const answers = await this.promptUser(samples);
      const { sample, destination } = answers;

      const targetPath = path.resolve(destination);
      const samplePath = path.join(this.tempRepoPath, sample);

      await this.moveSample(samplePath, targetPath);

      // Update manifest files after moving the sample
      const relativePath = path.relative(process.cwd(), targetPath);
      await this.updateManifestFiles(relativePath, destination);
    } catch (error) {
      console.error(error.message);
    } finally {
      await this.cleanupTempFiles();
    }
  }
}

const cli = new BedrockCLI();
cli.run();
