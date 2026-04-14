import inquirer from 'inquirer';
import { getSourceOptions, getCustomCategories, getCustomTemplates } from '../services/gitService.js';

// Prompt asking whether the user wants a Regolith-compatible project
export async function promptRegolith() {
  const { useRegolith } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useRegolith',
      message: 'Set up as a Regolith project? (adds config.json, BP/, RP/, data/ structure)',
      default: false
    }
  ]);

  let author = 'Unknown';
  if (useRegolith) {
    const { authorInput } = await inquirer.prompt([
      {
        type: 'input',
        name: 'authorInput',
        message: 'Author name for config.json:',
        default: 'Unknown'
      }
    ]);
    author = authorInput;
  }

  return { useRegolith, author };
}
// Prompt for category if custom source is selected
export async function promptCategory() {
  let categories = await getCustomCategories();
  // Filter out categories with no templates
  const filteredCategories = [];
  for (const cat of categories) {
    const templates = await getCustomTemplates(cat.value);
    if (templates && templates.length > 0) {
      filteredCategories.push(cat);
    }
  }
  if (!filteredCategories.length) {
    throw new Error('No categories with templates found in custom templates.');
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

// Prompt for template within a category
export async function promptTemplate(category) {
  const templates = await getCustomTemplates(category);
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
