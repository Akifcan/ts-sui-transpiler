import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

const TEMPLATE_CONTENT = `import { Module, Write } from "./decorators";
import { Mut, sui } from "./types";
import { exec } from "./utils";

@Module('hello_world')
class Greeting {

    User = {
        name: sui.STRING,
        status: sui.bool,
        age: sui.SMALL
    }

    Admin = {
        status: sui.bool
    }

    Counter = {
        value: sui.large
    }

    @Write('User')
    create_user(){}

    @Write('Admin')
    create_admin(){}

    incrementCounter(counterItem: Mut<'Counter'>){
        exec\`counterItem.value = counterItem.value + 1;\`
    }

    multiplyCounter(counterItem: Mut<'Counter'>){
        exec\`counterItem.value = counterItem.value * 2;\`
    }
}

export default Greeting
`;

export async function create(): Promise<void> {
  try {
    // Generate filename with timestamp
    const timestamp = Date.now();
    const filename = `demo${timestamp}.sui.ts`;
    const filepath = path.join(process.cwd(), filename);

    console.log(chalk.blue(`Creating demo file: ${filename}`));

    // Write the template content to the file
    fs.writeFileSync(filepath, TEMPLATE_CONTENT, 'utf-8');

    console.log(chalk.green.bold('\n✓ Success! Demo file created.'));
    console.log(chalk.cyan('\nFile created at:'));
    console.log(chalk.white(`  ${filepath}`));
    console.log(chalk.cyan('\nNext steps:'));
    console.log(chalk.white(`  1. Open ${filename} in your editor`));
    console.log(chalk.white(`  2. Modify the module as needed`));
    console.log(chalk.white(`  3. Run: demo-app --compile ${filename}`));
    console.log(chalk.gray('\nHappy coding!'));
  } catch (error) {
    console.log(chalk.red.bold('Failed to create demo file:'), error);
    process.exit(1);
  }
}