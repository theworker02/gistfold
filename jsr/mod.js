/* @ts-self-types="./mod.d.ts" */

import fs from "node:fs";
import path from "node:path";

export const PACKAGE = Object.freeze({ name: "@theworker02/gistfold", version: "1.1.0", runtime: "node", registry: "jsr" });
export const SKIP_DIRS = Object.freeze(["node_modules", ".git", "dist", "coverage", ".hg", ".svn"]);

export function listEntries(dir, { recurse = false } = {}, acc = []) {
  const root = path.resolve(dir);
  const entries = fs.readdirSync(root, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      if (recurse && !SKIP_DIRS.includes(entry.name)) listEntries(full, { recurse }, acc);
      continue;
    }
    if (entry.isFile()) acc.push({ name: entry.name, rel: path.relative(dir, full).replaceAll("\\", "/") || entry.name, full });
  }
  return acc;
}

export function hasCloneInstruction(text) { return /git\s+clone\s+\S+/i.test(String(text)); }

export function findTodoHits(files) {
  const hits = [];
  for (const file of files) {
    try { if (/\bTODO\b/.test(fs.readFileSync(file.full, "utf8"))) hits.push(file.rel); } catch {}
  }
  return hits;
}

export function foldCheck(dir, options = {}) {
  const root = path.resolve(dir);
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) throw new Error(`not a directory: ${root}`);
  const recurse = Boolean(options.recurse);
  const strict = Boolean(options.strict);
  const requireClone = strict || Boolean(options.requireClone);
  const noTodo = strict || Boolean(options.noTodo);
  const files = listEntries(root, { recurse });
  const readme = files.find((f) => f.name.toLowerCase() === "readme.md" && !f.rel.includes("/")) || files.find((f) => f.name.toLowerCase() === "readme.md");
  const hasReadme = Boolean(readme);
  const hasExample = files.some((f) => /^example\./i.test(f.name));
  const hasImpl = files.some((f) => f.name.toLowerCase() !== "readme.md" && !/^example\./i.test(f.name));
  const hasCloneLine = readme ? hasCloneInstruction(fs.readFileSync(readme.full, "utf8")) : false;
  const todos = noTodo ? findTodoHits(files) : [];
  const missing = [];
  if (!hasReadme) missing.push("README.md");
  if (!hasExample) missing.push("example.*");
  if (!hasImpl) missing.push("implementation file");
  if (requireClone && !hasCloneLine) missing.push("git clone line in README");
  if (noTodo && todos.length) missing.push(`TODO in ${todos.join(", ")}`);
  const ok = missing.length === 0;
  return { ok, status: ok ? "OK" : "FAIL", dir: root, recurse, strict, hasReadme, hasExample, hasImpl, hasCloneLine, todos, missing, files: files.map((f) => f.rel) };
}

export function formatHuman(result) {
  const lines = [`gistfold: ${result.status}  ${result.dir}`];
  if (result.missing.length) lines.push(...result.missing.map((item) => `  - ${item}`));
  return `${lines.join("\n")}\n`;
}
