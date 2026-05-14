import inquirer from 'inquirer';
import path from 'path';
import {
  getSourceOptions,
  getCommunityCategories,
  getCommunityTemplates
} from '../services/gitService.js';

/**
 * Source picker: Custom Workspace / Microsoft Samples / Community Templates.
 */
export async function promptSource() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'source',
      message: 'Select a template source:',
      choices: getSourceOptions()
    }
  ]);
}

/**
 * Project name — used for `bedrock.config.json.name`, `package.json.name`,
 * and manifest `header.name` for the Custom path. For Microsoft / Community
 * it's still threaded into the manifest rewriter.
 *
 * Defaults to `my-bedrock-addon`. Validation is intentionally light — npm
 * itself enforces stricter rules at install time.
 */
export async function promptProjectName(defaultName = 'my-bedrock-addon') {
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: defaultName,
      validate: (input) => {
        const trimmed = String(input).trim();
        if (!trimmed) return 'Project name cannot be empty.';
        if (/[\\/:*?"<>|]/.test(trimmed)) {
          return 'Project name cannot contain \\ / : * ? " < > |';
        }
        return true;
      },
      filter: (input) => String(input).trim()
    }
  ]);
  return projectName;
}

/**
 * Destination folder — defaults to `./<projectName>`.
 */
export async function promptDestination(defaultPath) {
  const { destination } = await inquirer.prompt([
    {
      type: 'input',
      name: 'destination',
      message: 'Destination folder:',
      default: defaultPath,
      filter: (input) => String(input).trim() || defaultPath
    }
  ]);
  return destination;
}

/**
 * Community Templates: category picker. Skips empty categories.
 */
export async function promptCategory() {
  let categories = await getCommunityCategories();
  const filteredCategories = [];
  for (const cat of categories) {
    const templates = await getCommunityTemplates(cat.value);
    if (templates && templates.length > 0) {
      filteredCategories.push(cat);
    }
  }
  if (!filteredCategories.length) {
    throw new Error('No categories with templates found in Community Templates.');
  }
  const { category } = await inquirer.prompt([
    {
      type: 'list',
      name: 'category',
      message: 'Select a template category:',
      choices: filteredCategories
    }
  ]);
  return category;
}

/**
 * Community Templates: template picker inside a category.
 */
export async function promptTemplate(category) {
  const templates = await getCommunityTemplates(category);
  if (!templates.length) {
    throw new Error('No templates found in this category.');
  }
  const { template } = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Select a template:',
      choices: templates
    }
  ]);
  return template;
}

/**
 * Microsoft Samples: sample picker.
 */
export async function promptSample(samples) {
  const { sample } = await inquirer.prompt([
    {
      type: 'list',
      name: 'sample',
      message: 'Select a sample to clone:',
      choices: samples
    }
  ]);
  return sample;
}

/**
 * Post-scaffold: offer to run `npm install` for the user.
 */
export async function promptAutoInstall() {
  const { install } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'install',
      message: 'Install dependencies now?',
      default: true
    }
  ]);
  return install;
}

/**
 * Legacy helper kept so external callers don't break. Returns the same shape
 * as the v1 `promptUser`.
 */
export async function promptUser(samples) {
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

// Re-export path so callers don't need their own import for default destinations.
export { path };
