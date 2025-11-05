export function showHelp(): void {
    console.log(`
Usage: demo-app [command] [options]

Commands:
  -h, --help                Show this help message
  -v, --version             Show version information
  -c, --compile <file>      Compile the specified file

Examples:
  demo-app --help
  demo-app --version
  demo-app --compile ./path/to/file.js
    `);
  }