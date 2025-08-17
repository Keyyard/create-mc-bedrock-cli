import { downloadAndExtractRepo } from './repoDownloadService.js';
import fs from 'fs/promises';
import { cleanupTempFiles } from '../utils/helpers.js';
import { getTemplateLabel, sortTemplates } from './templateLabels.js';

export const sources = {
  microsoft: {
    name: 'Microsoft Official Templates',
    repo: 'https://github.com/microsoft/minecraft-scripting-samples.git',
    tempRepoPath: './temp-repo-microsoft'
  },
  custom: {
    name: '⭐ Custom Templates',
    repo: 'https://github.com/Keyyard/custom-mc-scripting-templates.git',
    tempRepoPath: './temp-repo-custom'
  }
};
export async function fetchSamples(sourceKey) {
  const source = sources[sourceKey];
  console.log(`Fetching available samples from ${source.name}...`);
  await cleanupTempFiles();
  try {
    // Store the actual extracted repo root path
    const repoRoot = await downloadAndExtractRepo(source.repo, source.tempRepoPath);
    source.repoRoot = repoRoot;
  } catch (error) {
    throw new Error(`Error fetching samples: ${error.message}`);
  }
}

/**
 * Retrieves a list of available samples from the specified source.
 * 
 * This function reads the contents of the temporary repository directory
 * for the given source, filters out non-directory entries and those
 * starting with a dot, and maps them into a list of sample objects.
 * The samples are sorted to prioritize the 'ts-starter' sample.
 * 
 * @param {string} sourceKey - The key identifying the source repository.
 * @returns {Promise<Array<{name: string, value: string}>>} A promise that resolves
 *          to an array of sample objects, each containing a name and a value.
 */


// New: Get categories for custom templates
export async function getCustomCategories() {
  const source = sources.custom;
  try {
    const rootPath = source.repoRoot || source.tempRepoPath;
    const entries = await fs.readdir(rootPath, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
      .map(entry => ({
        name: formatCategoryName(entry.name),
        value: entry.name
      }));
  } catch (error) {
    console.error('Error reading categories:', error.message);
    return [];
  }
}

// New: Get templates within a selected custom category
export async function getCustomTemplates(category) {
  const source = sources.custom;
  const rootPath = source.repoRoot || source.tempRepoPath;
  const categoryPath = `${rootPath}/${category}`;
  try {
    const entries = await fs.readdir(categoryPath, { withFileTypes: true });
    let templates = entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
      .map(entry => ({
        name: getTemplateLabel(entry.name),
        value: entry.name
      }));
    templates = templates.sort(sortTemplates);
    return templates;
  } catch (error) {
    console.error('Error reading templates:', error.message);
    return [];
  }
}

// Helper to format category names for display
function formatCategoryName(name) {
  // Convert kebab-case or snake_case to Title Case
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

// For Microsoft source, keep the old getSamples behavior
export async function getSamples(sourceKey, category) {
  const source = sources[sourceKey];
  if (sourceKey === 'custom' && category) {
    return getCustomTemplates(category);
  }
  try {
    // Use the actual repo root if available, otherwise fallback to tempRepoPath
    const rootPath = source.repoRoot || source.tempRepoPath;
    const entries = await fs.readdir(rootPath, { withFileTypes: true });
    let samples = entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
      .map(entry => ({
        name: getTemplateLabel(entry.name),
        value: entry.name
      }));
    samples = samples.sort(sortTemplates);
    return samples;
  } catch (error) {
    console.error('Error reading samples:', error.message);
    return [];
  }
}

/**
 * Returns a list of source options for the user to select from.
 * @returns {import('inquirer').ListChoice[]} A list of source options.
 */
export function getSourceOptions() {
  return Object.entries(sources).map(([key, source]) => ({
    name: source.name,
    value: key
  }));
}
