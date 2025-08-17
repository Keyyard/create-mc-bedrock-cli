import fs from 'fs/promises';

export async function cleanupTempFiles() {
  try {
    await fs.rm('./temp-repo', { recursive: true, force: true });
    await fs.rm('./temp-repo-microsoft', { recursive: true, force: true });
    await fs.rm('./temp-repo-custom', { recursive: true, force: true });
  } catch (error) {
    console.error('Error cleaning up temporary files:', error.message);
  }
}