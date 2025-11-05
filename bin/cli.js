#!/usr/bin/env node

// This is the executable entry point for the CLI
const { CLI } = require('../dist/index.js');

const cli = new CLI();
cli.run();
