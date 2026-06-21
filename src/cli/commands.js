import inquirer from 'inquirer';
import path from 'path';

/**
 * Language picker for the starter: TypeScript (default) or JavaScript.
 */
export async function promptLanguage() {
  const { language } = await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Language:',
      choices: [
        { name: 'TypeScript (recommended)', value: 'typescript' },
        { name: 'JavaScript', value: 'javascript' }
      ]
    }
  ]);
  return language;
}

/**
 * Project name — used for `config.json.name`, `package.json.name`, and the
 * manifest `header.name`.
 *
 * Defaults to `my-bedrock-addon`. Validation is intentionally light — npm
 * itself enforces stricter rules at install time.
 */
export async function promptProjectName(defaultName = 'my-bedrock-addon') {
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: defaultName,
      validate: (input) => {
        const trimmed = String(input).trim();
        if (!trimmed) return 'Project name cannot be empty.';
        if (/[\\/:*?"<>|]/.test(trimmed)) {
          return 'Project name cannot contain \\ / : * ? " < > |';
        }
        return true;
      },
      filter: (input) => String(input).trim()
    }
  ]);
  return projectName;
}

/**
 * Destination folder — defaults to `./<projectName>`.
 */
export async function promptDestination(defaultPath) {
  const { destination } = await inquirer.prompt([
    {
      type: 'input',
      name: 'destination',
      message: 'Destination folder:',
      default: defaultPath,
      filter: (input) => String(input).trim() || defaultPath
    }
  ]);
  return destination;
}

/**
 * Post-scaffold: offer to run `npm install` for the user.
 */
export async function promptAutoInstall() {
  const { install } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'install',
      message: 'Install dependencies now?',
      default: true
    }
  ]);
  return install;
}

// Re-export path so callers don't need their own import for default destinations.
export { path };
