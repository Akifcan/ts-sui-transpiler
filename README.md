# demo-app

A CLI tool built with TypeScript.

## Installation

Install globally:

```bash
npm install -g demo-app
```

Or use with npx:

```bash
npx demo-app
```

## Usage

```bash
demo-app [command] [options]
```

### Commands

- `-h, --help` - Show help message
- `-v, --version` - Show version information

### Examples

```bash
# Show help
demo-app --help

# Show version
demo-app --version
```

## Development

### Prerequisites

- Node.js >= 14.0.0
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/demo-app.git
cd demo-app
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Run locally:
```bash
node bin/cli.js
```

Or link it globally for development:
```bash
npm link
demo-app --help
```

### Available Scripts

- `npm run build` - Build TypeScript to JavaScript
- `npm run watch` - Watch for changes and rebuild
- `npm run clean` - Remove build artifacts
- `npm test` - Run tests

## Project Structure

```
demo-app/
├── src/           # TypeScript source files
│   └── index.ts   # Main CLI logic
├── bin/           # Executable entry points
│   └── cli.js     # CLI executable
├── dist/          # Compiled JavaScript (generated)
├── package.json   # Package configuration
├── tsconfig.json  # TypeScript configuration
└── README.md      # This file
```

## Publishing

Before publishing to npm:

1. Update version in `package.json`
2. Build the project: `npm run build`
3. Test locally: `npm link`
4. Publish: `npm publish`

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

If you find any bugs or have feature requests, please create an issue at:
https://github.com/yourusername/demo-app/issues
