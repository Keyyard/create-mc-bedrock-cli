import { spawn } from 'child_process';

/**
 * Run `npm install` in `projectDir`, streaming stdout/stderr to the parent
 * terminal. Cross-platform: on Windows `npm` is `npm.cmd`, which `shell: true`
 * handles transparently.
 *
 * @param {string} projectDir
 * @returns {Promise<number>} the child process exit code
 */
export function runNpmInstall(projectDir) {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['install'], {
      cwd: projectDir,
      stdio: 'inherit',
      shell: true
    });
    child.on('error', reject);
    child.on('close', (code) => resolve(code ?? 0));
  });
}
