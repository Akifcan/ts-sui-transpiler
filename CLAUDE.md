# Demo App - CLI Tool Documentation

## About the Project

This is a CLI (Command Line Interface) tool built with TypeScript. It provides users with various operations through the command line.

## Available Features

### 1. Help Command
Displays the application's usage information.

```bash
demo-app --help
demo-app -h
```

### 2. Version Command
Displays the application's version information.

```bash
demo-app --version
demo-app -v
```

### 3. Compile Command
Compiles `.sui.ts` files. Validates file path and only accepts files with `.sui.ts` extension.

```bash
demo-app --compile <file-path>
demo-app -c <file-path>

# Example
demo-app --compile ./path/to/file.sui.ts
```

**Features:**
- File path validation with Yup schema
- Only accepts files with `.sui.ts` extension
- Colorized error messages with Chalk

### 4. Create Command
Clones the template project from GitHub and displays installation instructions.

```bash
demo-app --create
demo-app -cr
```

**What it does:**
1. Clones the `https://github.com/Akifcan/eth-istanbul-hackathon` repository to the current directory
2. After cloning, displays installation steps to the user:
   - `cd eth-istanbul-hackathon`
   - `npm install`
   - `npm run dev`

**Features:**
- Requires no parameters
- Uses a fixed GitHub repository URL
- Displays automatic installation instructions after cloning
- Executes git commands using `execSync`

## Project Structure

```
demo-app/
├── src/
│   ├── lib/
│   │   ├── show-help.ts      # Displays help message
│   │   ├── show-version.ts   # Displays version information
│   │   ├── compile.ts        # File compilation process
│   │   └── create.ts         # GitHub repository cloning
│   ├── schemas/
│   │   ├── file-path.schema.ts  # .sui.ts file path validation
│   │   └── slug.schema.ts       # Slug format validation (not in use)
│   └── index.ts              # Main CLI entry point
├── bin/
│   └── cli.js                # CLI executable
├── dist/                     # Compiled TypeScript files
├── package.json
└── tsconfig.json
```

## Technologies

- **TypeScript**: Type-safe code writing
- **Yup**: Schema validation
- **Chalk**: Terminal colorization
- **Node.js**: Runtime environment
- **child_process.execSync**: Execute git commands

## Development

### Adding a New Command

1. Create a new file under `src/lib/` (e.g., `my-command.ts`)
2. Export the command:
   ```typescript
   export async function myCommand(): Promise<void> {
     // Command logic
   }
   ```
3. Import it in `src/index.ts` and add to the switch case:
   ```typescript
   import { myCommand } from "./lib/my-command";

   // In the switch block
   case '--my-command':
   case '-mc':
     await myCommand();
     break;
   ```

### Adding a New Schema

1. Create a new schema file under `src/schemas/`
2. Define validation rules using Yup:
   ```typescript
   import * as yup from 'yup';

   export const mySchema = yup.string()
     .required('Field is required')
     .test('custom-rule', 'Error message', (value) => {
       // Validation logic
       return true;
     });
   ```

## Build & Run

```bash
# Build during development
npm run build

# Run in watch mode
npm run watch

# Clean build files
npm run clean

# Test the command
node bin/cli.js --create
```

## Future Features

- [ ] Real compilation logic for `.sui.ts` files
- [ ] More template repository options
- [ ] Interactive CLI mode
- [ ] Configuration file support
