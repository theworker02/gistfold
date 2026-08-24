#!/usr/bin/env node
const { foldCheck, formatHuman } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

function parseArgv(argv) {
  const flags = {};
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--") {
      positional.push(...argv.slice(i + 1));
      break;
    }
    if (arg === "-h" || arg === "--help") {
      flags.help = true;
      continue;
    }
    if (arg === "-V" || arg === "-v" || arg === "--version") {
      flags.version = true;
      continue;
    }
    if (arg === "--json") {
      flags.json = true;
      continue;
    }
    if (arg === "--recurse") {
      flags.recurse = true;
      continue;
    }
    if (arg === "--strict") {
      flags.strict = true;
      continue;
    }
    if (arg === "--clone-line") {
      flags.requireClone = true;
      continue;
    }
    if (arg === "--no-todo") {
      flags.noTodo = true;
      continue;
    }
    if (arg === "--missing") {
      flags.missingOnly = true;
      continue;
    }
    if (arg.startsWith("-")) {
      throw new Error(`unknown option: ${arg}`);
    }
    positional.push(arg);
  }
  return { flags, positional };
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

try {
  const { flags, positional } = parseArgv(process.argv.slice(2));
  if (flags.help) {
    process.stdout.write(HELP);
    process.exit(0);
  }
  if (flags.version) {
    process.stdout.write(`${VERSION}\n`);
    process.exit(0);
  }

  let command = "check";
  const rest = [...positional];
  if (rest[0] === "check" || rest[0] === "list") {
    command = rest.shift();
  }
  const target = rest[0] || process.cwd();
  if (rest.length > 1) fail("usage: gistfold [check|list] [options] [dir]");

  const result = foldCheck(target, {
    recurse: flags.recurse,
    strict: flags.strict,
    requireClone: flags.requireClone,
    noTodo: flags.noTodo,
  });

  if (flags.json) {
    process.stdout.write(`${JSON.stringify(result)}\n`);
  } else if (command === "list" || flags.missingOnly) {
    const items = command === "list" ? result.files : result.missing;
    if (command === "list") {
      process.stdout.write(`scanned ${items.length} file(s) in ${result.dir}\n`);
      for (const file of items) process.stdout.write(`  ${file}\n`);
      if (result.missing.length) {
        process.stdout.write("missing:\n");
        for (const item of result.missing) process.stdout.write(`  - ${item}\n`);
      }
    } else if (result.missing.length) {
      process.stdout.write(`${result.missing.join("\n")}\n`);
    }
  } else {
    process.stdout.write(formatHuman(result));
  }
  process.exit(result.ok ? 0 : 1);
} catch (err) {
  fail(err.message);
}
