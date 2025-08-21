import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

export async function displayAsciiArt() {
  const artLines = [
    '---',
    '',
    ' ▄▄· ▄▄▄  ▄▄▄ . ▄▄▄· ▄▄▄▄▄▄▄▄ .    ▄▄▄▄· ▄▄▄ .·▄▄▄▄  ▄▄▄         ▄▄· ▄ •▄      ▄▄· ▄▄▌  ▪  ',
    '▐█ ▌▪▀▄ █·▀▄.▀·▐█ ▀█ •██  ▀▄.▀·    ▐█ ▀█▪▀▄.▀·██▪ ██ ▀▄ █·▪     ▐█ ▌▪█▌▄▌▪    ▐█ ▌▪██•  ██ ',
    '██ ▄▄▐▀▀▄ ▐▀▀▪▄▄█▀▀█  ▐█.▪▐▀▀▪▄    ▐█▀▀█▄▐▀▀▪▄▐█· ▐█▌▐▀▀▄  ▄█▀▄ ██ ▄▄▐▀▀▄·    ██ ▄▄██▪  ▐█·',
    '▐███▌▐█•█▌▐█▄▄▌▐█ ▪▐▌ ▐█▌·▐█▄▄▌    ██▄▪▐█▐█▄▄▌██. ██ ▐█•█▌▐█▌.▐▌▐███▌▐█.█▌    ▐███▌▐█▌▐▌▐█▌',
    '·▀▀▀ .▀  ▀ ▀▀▀  ▀  ▀  ▀▀▀  ▀▀▀     ·▀▀▀▀  ▀▀▀ ▀▀▀▀▀• .▀  ▀ ▀█▄▀▪·▀▀▀ ·▀  ▀    ·▀▀▀ .▀▀▀ ▀▀▀',
    '',
    '---',
    'by @keyyard - workspaces from Microsoft Minecraft Scripting Samples',
    '---',
  ];

  for (const line of artLines) {
    console.log(line);
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // display the package version bottom-right as `vX.Y.Z`
  try {
    const thisFile = fileURLToPath(import.meta.url);
    const pkgPath = path.resolve(path.dirname(thisFile), '../../package.json');
    const pkgText = await readFile(pkgPath, 'utf8');
    const pkg = JSON.parse(pkgText);
    const version = pkg.version || '';
    if (version) {
      const versionText = `v${version}`;
      // print it right-aligned on the console line
      const cols = process.stdout && process.stdout.columns ? process.stdout.columns : 80;
      const padding = Math.max(1, cols - versionText.length);
      console.log(' '.repeat(padding - 1) + versionText);
    }
  } catch (err) {
    // silently ignore version display failures
  }
}
