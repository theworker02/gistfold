# gistfold

<img src="docs/logo.svg" alt="gistfold mark" width="88" height="88">

**Confirm a folder is shareable: README.md, an example.* file, and a separate implementation file.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/gistfold?display_name=release)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

## Why it exists

A gist or snippet dump that is missing a README or an example wastes the next reader's time. gistfold is a one-shot folder lint you can run in CI or at the prompt before you publish.

## Who it is for

Authors of sample folders, workshop materials, and tiny repos who want a mechanical check instead of a visual glance.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

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
npx --yes git+https://github.com/theworker02/gistfold.git --help
node src/cli.js --help
```

## Quick start

Create a passing folder and inspect the JSON:

```bash
mkdir demo && printf '# Demo\n' > demo/README.md && printf 'module.exports = 1\n' > demo/example.js && printf 'console.log(1)\n' > demo/index.js
gistfold demo
```

Expected output includes `"status":"OK"` and `"ok":true`. Exit code is 0.

## CLI reference

Synopsis:

```text
gistfold [options] [dir]
```

| Flag / argument | Meaning |
| --- | --- |
| `-h, --help` | Print detailed usage and exit 0. |
| `-v, --version` | Print 1.0.0 and exit 0. |
| `dir` | Directory to scan. Defaults to the current working directory. Only top-level files count. |

Print the same text locally:

```bash
gistfold --help
gistfold --version
```

Expected version output:

```text
1.0.0
```

## Configuration

No configuration file. The check is fixed: README.md (any case), a filename matching /^example\./i, and at least one other regular file as the implementation.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Folder is OK. JSON status is "OK". |
| `1` | Folder is missing a required file. JSON status is "FAIL". |

## Examples

### Success path

The folder contains `README.md`, `example.js`, and `index.js`.

```bash
gistfold ./demo
```

```json
{"ok":true,"status":"OK","hasReadme":true,"hasExample":true,"hasImpl":true}
```

### Failure path

An empty directory fails every check.

```bash
mkdir empty && gistfold ./empty ; echo exit:$?
```

```json
{"ok":false,"status":"FAIL","hasReadme":false,"hasExample":false,"hasImpl":false}
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
