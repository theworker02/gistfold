const fs = require("node:fs");
const path = require("node:path");

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);
}

function foldCheck(dir) {
  const root = path.resolve(dir);
  const files = listFiles(root);
  const hasReadme = files.some((name) => name.toLowerCase() === "readme.md");
  const hasExample = files.some((name) => /^example\./i.test(name));
  const hasImpl = files.some((name) => {
    if (name.toLowerCase() === "readme.md") return false;
    if (/^example\./i.test(name)) return false;
    return true;
  });
  const ok = hasReadme && hasExample && hasImpl;
  return {
    ok,
    status: ok ? "OK" : "FAIL",
    dir: root,
    hasReadme,
    hasExample,
    hasImpl,
    files,
  };
}

module.exports = { foldCheck };
