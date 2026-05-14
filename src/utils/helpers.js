import fs from 'fs/promises';

const TEMP_DIRS = [
  './temp-repo',
  './temp-repo-microsoft',
  // v1 name kept here so users upgrading mid-flight don't end up with orphaned dirs.
  './temp-repo-custom',
  './temp-repo-community'
];

export async function cleanupTempFiles() {
  for (const dir of TEMP_DIRS) {
    try {
      await fs.rm(dir, { recursive: true, force: true });
    } catch (error) {
      console.error(`Error cleaning up temporary files at ${dir}:`, error.message);
    }
  }
}
