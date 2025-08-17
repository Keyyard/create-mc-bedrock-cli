import https from 'https';
import fs from 'fs';
import unzipper from 'unzipper';

/**
 * Downloads a zip file from a GitHub repository and extracts it to a target directory.
 * @param {string} repoUrl - The GitHub repository URL (e.g., https://github.com/user/repo.git)
 * @param {string} destDir - The directory to extract the contents to.
 * @param {string} [branch='main'] - The branch to download (default: main)
 */
export async function downloadAndExtractRepo(repoUrl, destDir, branch = 'main') {
  // Convert repo URL to zipball URL
  const match = repoUrl.match(/github.com[/:]([^/]+)\/([^/.]+)(.git)?/);
  if (!match) throw new Error('Invalid GitHub repo URL');
  const owner = match[1];
  const repo = match[2];
  const zipUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/${branch}.zip`;

  // Download zip to a temp file
  const tmpZip = `${destDir}/repo.zip`;
  await new Promise((resolve, reject) => {
    const file = fs.createWriteStream(tmpZip);
    https.get(zipUrl, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download zip: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });

  // Extract zip
  await fs.createReadStream(tmpZip)
    .pipe(unzipper.Extract({ path: destDir }))
    .promise();

  // Remove the zip file
  fs.unlinkSync(tmpZip);
}
