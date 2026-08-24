const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { foldCheck, hasCloneInstruction } = require("../src/index.js");

const cli = path.join(__dirname, "..", "src", "cli.js");

function run(args, cwd) {
  return spawnSync(process.execPath, [cli, ...args], { encoding: "utf8", cwd });
}

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
    assert.deepEqual(result.missing, ["README.md", "example.*", "implementation file"]);
  });

  it("passes when README, example, and impl exist", () => {
    fs.writeFileSync(path.join(dir, "README.md"), "# demo\n\ngit clone https://example.com/demo.git\n");
    fs.writeFileSync(path.join(dir, "example.js"), "module.exports = 1;\n");
    fs.writeFileSync(path.join(dir, "index.js"), "console.log('ok');\n");
    const result = foldCheck(dir);
    assert.equal(result.status, "OK");
    assert.equal(result.hasReadme, true);
    assert.equal(result.hasExample, true);
    assert.equal(result.hasImpl, true);
    assert.equal(result.hasCloneLine, true);
  });

  it("detects clone instructions and TODO under --strict", () => {
    assert.equal(hasCloneInstruction("please git clone git@host:repo.git"), true);
    fs.writeFileSync(path.join(dir, "index.js"), "console.log('TODO');\n");
    const result = foldCheck(dir, { strict: true });
    assert.equal(result.ok, false);
    assert.ok(result.todos.includes("index.js"));
  });

  it("recurses into nested example files", () => {
    const nested = fs.mkdtempSync(path.join(os.tmpdir(), "gistfold-nested-"));
    fs.writeFileSync(path.join(nested, "README.md"), "# n\n\ngit clone https://x/y.git\n");
    fs.mkdirSync(path.join(nested, "samples"));
    fs.writeFileSync(path.join(nested, "samples", "example.md"), "demo\n");
    fs.writeFileSync(path.join(nested, "lib.js"), "exports.x = 1;\n");
    const shallow = foldCheck(nested);
    assert.equal(shallow.hasExample, false);
    const deep = foldCheck(nested, { recurse: true });
    assert.equal(deep.hasExample, true);
    assert.equal(deep.ok, true);
    fs.rmSync(nested, { recursive: true, force: true });
  });

  it("CLI --json fails a missing directory with a clear error", () => {
    const result = run(["--json", path.join(dir, "no-such-dir")]);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /not a directory/);
  });

  it("CLI human output and list --json", () => {
    const good = fs.mkdtempSync(path.join(os.tmpdir(), "gistfold-good-"));
    fs.writeFileSync(path.join(good, "README.md"), "# g\n\ngit clone https://x/y.git\n");
    fs.writeFileSync(path.join(good, "example.js"), "1\n");
    fs.writeFileSync(path.join(good, "app.js"), "2\n");
    const human = run([good]);
    assert.equal(human.status, 0);
    assert.match(human.stdout, /gistfold: OK/);
    const json = run(["list", "--json", good]);
    assert.equal(json.status, 0);
    const body = JSON.parse(json.stdout);
    assert.equal(body.ok, true);
    assert.ok(body.files.includes("README.md"));
    fs.rmSync(good, { recursive: true, force: true });
  });
});
