# gistfold

<img src="docs/logo.svg" alt="gistfold mark" width="72" height="72">

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![npm 1.0.0](https://img.shields.io/badge/npm-1.0.0-0B1F33)

Validate that a folder is a complete gist-style drop: a `README.md`, a file matching `/^example\./i`, and at least one other implementation file. Prints a JSON OK/FAIL report.

Package version: **1.00** (`1.0.0`).

## Install

```bash
git clone https://github.com/theworker02/gistfold.git
cd gistfold
npm install -g .
```

Or run without installing:

```bash
node src/cli.js [dir]
```

## Usage

```bash
gistfold
gistfold ./my-snippet
```

Exit code `0` on OK, `1` on FAIL.

## GitHub Pages

Source: `main` branch, `/docs` folder. Enable Pages in repository settings, then open `https://theworker02.github.io/gistfold/`.

## License

MIT © 2026 theworker02
