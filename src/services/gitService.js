import { downloadAndExtractRepo } from './repoDownloadService.js';
import fs from 'fs/promises';
import { cleanupTempFiles } from '../utils/helpers.js';
import { getTemplateLabel, sortTemplates } from './templateLabels.js';

/**
 * Source registry. Order here determines display order in the CLI.
 *
 * `custom` is the new bundled Custom Workspace (powered by @keyyard/bedrock-build)
 * and is marked `bundled: true` so the orchestrator skips remote fetch entirely.
 */
export const sources = {
  custom: {
    name: '⭐ Custom Workspace (recommended)',
    bundled: true
  },
  microsoft: {
    name: 'Microsoft Official Samples',
    repo: 'https://github.com/microsoft/minecraft-scripting-samples.git',
    tempRepoPath: './temp-repo-microsoft'
  },
  community: {
    name: 'Community Templates',
    repo: 'https://github.com/Keyyard/custom-mc-scripting-templates.git',
    tempRepoPath: './temp-repo-community'
  }
};

/**
 * Fetch a remote source's zip and unpack to its tempRepoPath. No-op for
 * bundled sources (Custom Workspace).
 */
export async function fetchSamples(sourceKey) {
  const source = sources[sourceKey];
  if (!source) throw new Error(`Unknown source: ${sourceKey}`);
  if (source.bundled) return; // Custom Workspace ships inside this package.

  console.log(`Fetching available samples from ${source.name}...`);
  await cleanupTempFiles();
  try {
    const repoRoot = await downloadAndExtractRepo(source.repo, source.tempRepoPath);
    source.repoRoot = repoRoot;
  } catch (error) {
    throw new Error(`Error fetching samples: ${error.message}`);
  }
}

/**
 * Get top-level template categories for the Community Templates source.
 * Filters out hidden dirs.
 */
export async function getCommunityCategories() {
  const source = sources.community;
  try {
    const rootPath = source.repoRoot || source.tempRepoPath;
    const entries = await fs.readdir(rootPath, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
      .map((entry) => ({
        name: formatCategoryName(entry.name),
        value: entry.name
      }));
  } catch (error) {
    console.error('Error reading categories:', error.message);
    return [];
  }
}

/**
 * Get templates inside a Community Templates category.
 */
export async function getCommunityTemplates(category) {
  const source = sources.community;
  const rootPath = source.repoRoot || source.tempRepoPath;
  const categoryPath = `${rootPath}/${category}`;
  try {
    const entries = await fs.readdir(categoryPath, { withFileTypes: true });
    let templates = entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
      .map((entry) => ({
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

// Backwards-compatible aliases used by older imports. Prefer the
// `getCommunity*` names going forward.
export const getCustomCategories = getCommunityCategories;
export const getCustomTemplates = getCommunityTemplates;

function formatCategoryName(name) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Microsoft Samples: list top-level sample folders. Also tolerates a
 * `category` argument and proxies to `getCommunityTemplates` for the
 * community source (legacy usage).
 */
export async function getSamples(sourceKey, category) {
  const source = sources[sourceKey];
  if (!source) throw new Error(`Unknown source: ${sourceKey}`);
  if (sourceKey === 'community' && category) {
    return getCommunityTemplates(category);
  }
  try {
    const rootPath = source.repoRoot || source.tempRepoPath;
    const entries = await fs.readdir(rootPath, { withFileTypes: true });
    let samples = entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
      .map((entry) => ({
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
 * Returns source options in display order (custom first).
 */
export function getSourceOptions() {
  return Object.entries(sources).map(([key, source]) => ({
    name: source.name,
    value: key
  }));
}
