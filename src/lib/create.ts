import chalk from 'chalk';
import { execSync } from 'child_process';

const TEMPLATE_REPO_URL = 'https://github.com/Akifcan/eth-istanbul-hackathon';
const REPO_NAME = 'eth-istanbul-hackathon';

export async function create(): Promise<void> {
  try {
    console.log(chalk.blue(`Cloning repository: ${TEMPLATE_REPO_URL}`));

    // Execute git clone
    execSync(`git clone ${TEMPLATE_REPO_URL}`, {
      cwd: process.cwd(),
      stdio: 'inherit'
    });

    console.log(chalk.green.bold('\n✓ Success! Repository cloned.'));
    console.log(chalk.cyan('\nNext steps:'));
    console.log(chalk.white(`  1. cd ${REPO_NAME}`));
    console.log(chalk.white('  2. npm install'));
    console.log(chalk.white('  3. npm run dev'));
    console.log(chalk.gray('\nHappy coding!'));
  } catch (error) {
    console.log(chalk.red.bold('Failed to clone repository:'), error);
    process.exit(1);
  }
}
