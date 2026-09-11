import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

const GITIGNORE_CONTENTS = `node_modules/
dist/
`;

/**
 * Write a starter `.gitignore` and run `git init` in `projectDir`.
 * The gitignore is written even if `git init` fails.
 *
 * @param {string} projectDir
 * @returns {Promise<number>} the `git init` exit code (`0` on success)
 */
export async function initGitRepository(projectDir) {
  await fs.writeFile(path.join(projectDir, '.gitignore'), GITIGNORE_CONTENTS, 'utf8');

  return new Promise((resolve, reject) => {
    const child = spawn('git', ['init'], {
      cwd: projectDir,
      stdio: 'inherit',
      shell: true
    });
    child.on('error', reject);
    child.on('close', (code) => resolve(code ?? 0));
  });
}
