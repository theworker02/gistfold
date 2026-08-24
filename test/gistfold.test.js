const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { foldCheck } = require("../src/index.js");

describe("gistfold", () => {
  let dir;

  before(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "gistfold-"));
  });

  after(() => {
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it("fails an empty directory", () => {
    const result = foldCheck(dir);
    assert.equal(result.status, "FAIL");
    assert.equal(result.ok, false);
  });

  it("passes when README, example, and impl exist", () => {
    fs.writeFileSync(path.join(dir, "README.md"), "# demo\n");
    fs.writeFileSync(path.join(dir, "example.js"), "module.exports = 1;\n");
    fs.writeFileSync(path.join(dir, "index.js"), "console.log('ok');\n");
    const result = foldCheck(dir);
    assert.equal(result.status, "OK");
    assert.equal(result.hasReadme, true);
    assert.equal(result.hasExample, true);
    assert.equal(result.hasImpl, true);
  });
});
