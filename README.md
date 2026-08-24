# gistfold

<img src="docs/logo.svg" alt="gistfold mark" width="96" height="96">

**Confirm a folder is shareable: README.md, an example.* file, and a separate implementation file.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/gistfold?display_name=release)
[![npm](https://img.shields.io/npm/v/@magnexis/gistfold.svg)](https://www.npmjs.com/package/@magnexis/gistfold)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

**Docs:** [GitHub Pages](https://theworker02.github.io/gistfold/) · **Source:** [`theworker02/gistfold`](https://github.com/theworker02/gistfold) · **Release 1.00:** [`v1.0.0`](https://github.com/theworker02/gistfold/releases/tag/v1.0.0) · **npm:** [`@magnexis/gistfold`](https://www.npmjs.com/package/@magnexis/gistfold)

## Why it exists

A gist or snippet dump that is missing a README or an example wastes the next reader's time. gistfold is a one-shot folder lint you can run in CI or at the prompt before you publish.

## Who it is for

Authors of sample folders, workshop materials, and tiny repos who want a mechanical check instead of a visual glance.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

### Global install from npm

```bash
npm install -g @magnexis/gistfold
gistfold --help
```

Package page: https://www.npmjs.com/package/@magnexis/gistfold

### Global install from GitHub

```bash
npm install -g git+https://github.com/theworker02/gistfold.git
gistfold --help
```

### Clone and link locally

```bash
git clone https://github.com/theworker02/gistfold.git
cd gistfold
npm install -g .
```

### Run without installing (npx / node)

```bash
npx --yes @magnexis/gistfold --help
node src/cli.js --help
```

## Quick start

Create a passing folder and inspect the report:

```bash
mkdir demo && printf '# Demo\n\ngit clone https://example.com/demo.git\n' > demo/README.md && printf 'module.exports = 1\n' > demo/example.js && printf 'console.log(1)\n' > demo/index.js
gistfold demo
gistfold --json demo
```

Human output includes `gistfold: OK`. `--json` includes `"status":"OK"` and `"ok":true`. Exit code is 0.

## CLI reference

```text
gistfold 1.00 (1.0.0)

Usage:
  gistfold [check] [options] [dir]
  gistfold list [options] [dir]

Confirm a folder is shareable as a gist-style drop:
  * README.md (case-insensitive, top-level preferred)
  * a file matching /^example./i  (example.js, EXAMPLE.md, ...)
  * at least one other implementation file

Subcommands:
  check              Run the folder lint (default if omitted)
  list               Print scanned files and any missing requirements

Options:
  -h, --help         Show this help and exit 0
  -V, -v, --version  Print 1.0.0 and exit 0
  --json             Machine-readable JSON object on stdout
  --recurse          Include nested files (skips node_modules, .git, dist)
  --strict           Also require a "git clone ..." line in README and
                     fail if any scanned file contains the token TODO
  --clone-line       Require a git clone instruction without full --strict
  --no-todo          Fail when TODO appears in scanned files
  --missing          With human output, print only the missing list

Arguments:
  dir                Directory to scan (default: current working directory)

Output:
  Human report on stdout by default. --json prints one object.
  Exit 0 on OK, 1 on FAIL or usage errors.

Examples:
  gistfold
  gistfold ./my-snippet
  gistfold check --recurse --strict ./workshop
  gistfold list --json ./workshop
```

Print the same text locally:

```bash
gistfold --help
gistfold -h
gistfold --version
gistfold -V
```

Expected version output:

```text
1.0.0
```

## Configuration

No configuration file. Use `--recurse` for nested files, `--strict` to require a `git clone` line and fail on TODO.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Folder is OK. |
| `1` | Missing required files, TODO under --strict, or not a directory. |

## Examples

### Success path

A folder with README.md, example.js, index.js, and a git clone line.

```bash
gistfold ./demo
```

```text
gistfold: OK  /abs/demo
  README.md              ok
  example.*              ok
  implementation         ok
```

### Failure path

An empty directory fails every check.

```bash
mkdir empty && gistfold ./empty ; echo exit:$?
```

```text
gistfold: FAIL  /abs/empty
missing:
  - README.md
  - example.*
  - implementation file
```

Exit code is 1.

## How to run tests

No extra packages. From the repository root:

```bash
npm test
# same as:
node --test
```

All tests must pass before you open a pull request against `main`.

## GitHub Pages

This repository ships a product site in `/docs`.

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Branch: **`main`**.
4. Folder: **`/docs`**.
5. Save, then wait for the Pages deployment.
6. Open [https://theworker02.github.io/gistfold/](https://theworker02.github.io/gistfold/).

Do not point Pages at `master`. The default branch is `main`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Open pull requests against **`main`**.

## Security

See [SECURITY.md](SECURITY.md). Please report vulnerabilities privately.

## License

[MIT](LICENSE) © 2026 theworker02

## Funding

- GitHub Sponsors: [theworker02](https://github.com/sponsors/theworker02)
- thanks.dev: [https://thanks.dev/u/gh/theworker02](https://thanks.dev/u/gh/theworker02)
