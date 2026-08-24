#!/usr/bin/env node
const { foldCheck } = require("./index.js");

const target = process.argv[2] || process.cwd();
const result = foldCheck(target);
process.stdout.write(`${JSON.stringify(result)}\n`);
process.exit(result.ok ? 0 : 1);
