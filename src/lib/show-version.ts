export function showVersion(): void {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { version } = require('../package.json');
    console.log(`v${version}`);
  }