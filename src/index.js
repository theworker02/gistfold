const fs = require("node:fs");
const path = require("node:path");

const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "coverage", ".hg", ".svn"]);

function listEntries(dir, { recurse = false } = {}, acc = []) {
  const root = path.resolve(dir);
  let entries;
  try {
    entries = fs.readdirSync(root, { withFileTypes: true });
  } catch (err) {
    const error = new Error(`cannot read directory: ${root} (${err.message})`);
    error.code = "ENOTDIR";
    throw error;
  }
  for (const entry of entries) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      if (recurse && !SKIP_DIRS.has(entry.name)) {
        listEntries(full, { recurse }, acc);
      }
      continue;
    }
    if (entry.isFile()) {
      acc.push({
        name: entry.name,
        rel: path.relative(dir, full).replaceAll("\\", "/") || entry.name,
        full,
      });
    }
  }
  return acc;
}

function isReadme(name) {
  return name.toLowerCase() === "readme.md";
}

function isExample(name) {
  return /^example\./i.test(name);
}

function hasCloneInstruction(text) {
  return /git\s+clone\s+\S+/i.test(text);
}

function findTodoHits(files) {
  const hits = [];
  for (const file of files) {
    let text;
    try {
      text = fs.readFileSync(file.full, "utf8");
    } catch {
      continue;
    }
    if (/\bTODO\b/.test(text)) hits.push(file.rel);
  }
  return hits;
}

function foldCheck(dir, options = {}) {
  const root = path.resolve(dir);
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
    const error = new Error(`not a directory: ${root}`);
    error.code = "ENOTDIR";
    throw error;
  }

  const recurse = Boolean(options.recurse);
  const strict = Boolean(options.strict);
  const requireClone = strict || Boolean(options.requireClone);
  const noTodo = strict || Boolean(options.noTodo);

  const files = listEntries(root, { recurse });
  const names = files.map((f) => f.name);
  const rels = files.map((f) => f.rel);

  const topReadme = files.find((f) => isReadme(f.name) && !f.rel.includes("/"));
  const readme = topReadme || files.find((f) => isReadme(f.name));
  const hasReadme = Boolean(readme);
  const hasExample = files.some((f) => isExample(f.name));
  const hasImpl = files.some((f) => !isReadme(f.name) && !isExample(f.name));

  let hasCloneLine = false;
  if (readme) {
    hasCloneLine = hasCloneInstruction(fs.readFileSync(readme.full, "utf8"));
  }

  const todos = noTodo ? findTodoHits(files) : [];

  const missing = [];
  if (!hasReadme) missing.push("README.md");
  if (!hasExample) missing.push("example.*");
  if (!hasImpl) missing.push("implementation file");
  if (requireClone && !hasCloneLine) missing.push("git clone line in README");
  if (noTodo && todos.length) missing.push(`TODO in ${todos.join(", ")}`);

  const ok = missing.length === 0;
  return {
    ok,
    status: ok ? "OK" : "FAIL",
    dir: root,
    recurse,
    strict,
    hasReadme,
    hasExample,
    hasImpl,
    hasCloneLine,
    todos,
    missing,
    files: recurse ? rels : names,
  };
}

function formatHuman(result) {
  const lines = [`gistfold: ${result.status}  ${result.dir}`];
  const row = (label, pass, extra = "") =>
    `  ${label.padEnd(22)} ${pass ? "ok" : "missing"}${extra ? `  ${extra}` : ""}`;
  lines.push(row("README.md", result.hasReadme));
  lines.push(row("example.*", result.hasExample));
  lines.push(row("implementation", result.hasImpl));
  lines.push(row("clone line", result.hasCloneLine, result.strict || result.hasCloneLine ? "" : "(optional unless --strict)"));
  if (result.todos.length) {
    lines.push(`  TODO                    found in ${result.todos.join(", ")}`);
  } else {
    lines.push(row("TODO-free", true));
  }
  if (result.missing.length) {
    lines.push("missing:");
    for (const item of result.missing) lines.push(`  - ${item}`);
  }
  return `${lines.join("\n")}\n`;
}

module.exports = {
  listEntries,
  hasCloneInstruction,
  findTodoHits,
  foldCheck,
  formatHuman,
};
