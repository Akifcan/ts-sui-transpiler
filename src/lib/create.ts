import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

const TEMPLATE_CONTENT = `import { Balance, Has, Mint, Module, Push, Vector, Write } from "./decorators";
import { BalanceFor, Mut, sui } from "./types";
import { exec } from "./utils";

@Module('hello_world')
class Greeting {

    @Balance()
    MyWorks: BalanceFor = ['deposit', 'withdraw', 'get_balance']

    @Balance()
    MyFunds: BalanceFor = ['deposit', 'withdraw']

    @Has(['key', 'store'])
    User = {
        name: sui.string,
        status: sui.bool,
        age: sui.u8
    }

    @Has(['key', 'store'])
    Admin = {
        status: sui.bool
    }

    @Has(['key', 'store'])
    Counter = {
        value: sui.u32
    }

    @Has(['key', 'store'])
    @Vector()
    Project = {
        name: sui.string,
        description: sui.string,
        webSiteUrl: sui.string
    }

    @Write('User')
    create_user(){}

    @Write('Admin')
    create_admin(){}


    @Push('Project')
    create_project(){}

    @Mint('Admin')
    mint_hero(){}

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