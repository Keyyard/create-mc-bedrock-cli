
import https from 'https';
import fs from 'fs';
import { promises as fsp } from 'fs';
import unzipper from 'unzipper';

/**
 * Downloads a zip file from a GitHub repository and extracts it to a target directory.
 * @param {string} repoUrl - The GitHub repository URL (e.g., https://github.com/user/repo.git)
 * @param {string} destDir - The directory to extract the contents to.
 * @param {string} [branch='main'] - The branch to download (default: main)
 */
/**
 * Downloads and extracts a GitHub repo zip, returning the actual extracted repo root.
 * @param {string} repoUrl
 * @param {string} destDir
 * @param {string} [branch='main']
 * @returns {Promise<string>} Path to the extracted repo root
 */
export async function downloadAndExtractRepo(repoUrl, destDir, branch = 'main') {
  // Convert repo URL to zipball URL
  const match = repoUrl.match(/github.com[/:]([^/]+)\/([^/.]+)(.git)?/);
  if (!match) throw new Error('Invalid GitHub repo URL');
  const owner = match[1];
  const repo = match[2];
  const zipUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/${branch}.zip`;


  // Ensure destination directory exists
  await fsp.mkdir(destDir, { recursive: true });


  // Download zip to a temp file, following redirects
  const tmpZip = `${destDir}/repo.zip`;
  async function download(url, file) {
    return new Promise((resolve, reject) => {
      https.get(url, response => {
        if (response.statusCode === 302 && response.headers.location) {
          // Follow redirect
          download(response.headers.location, file).then(resolve).catch(reject);
          return;
        }
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download zip: ${response.statusCode}`));
          return;
        }
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      }).on('error', reject);
    });
  }
  await fsp.mkdir(destDir, { recursive: true });
  const file = fs.createWriteStream(tmpZip);
  await download(zipUrl, file);

  // Extract zip
  await fs.createReadStream(tmpZip)
    .pipe(unzipper.Extract({ path: destDir }))
    .promise();

  // Remove the zip file
  fs.unlinkSync(tmpZip);

  // Find the actual extracted repo root (should be the only folder in destDir)
  const entries = await fsp.readdir(destDir, { withFileTypes: true });
  const repoRoot = entries.find(e => e.isDirectory());
  if (!repoRoot) throw new Error('No repo root found after extraction');
  return `${destDir}/${repoRoot.name}`;
}
