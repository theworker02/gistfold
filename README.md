# gistfold

<img src="docs/logo.svg" alt="gistfold mark" width="96" height="96">

**Validate whether a small source folder is complete enough to share as a gist, example, or workshop artifact.**

[![JSR](https://jsr.io/badges/@theworker02/gistfold)](https://jsr.io/@theworker02/gistfold)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)

**Package:** [`@theworker02/gistfold`](https://jsr.io/@theworker02/gistfold) · **Site:** [GitHub Pages](https://theworker02.github.io/gistfold/) · **Source:** [`theworker02/gistfold`](https://github.com/theworker02/gistfold)

## Highlights

- Checks for a README, example file, and separate implementation file.
- Optional recursive and strict modes.
- Detects clone instructions and TODO markers.
- Fully documented ESM API for JSR.
- Trusted GitHub Actions publishing with OIDC provenance.

## Add from JSR

```bash
deno add jsr:@theworker02/gistfold
```

```ts
import { foldCheck, hasCloneInstruction, PACKAGE } from "@theworker02/gistfold";

const result = foldCheck("./example", { recurse: true, strict: true });
console.log(result.ok, PACKAGE.version);
console.log(hasCloneInstruction("git clone https://github.com/example/repo.git"));
```

## Public API

- `foldCheck(dir, options)` — validate a folder.
- `listEntries(dir, options)` — enumerate scanned files.
- `hasCloneInstruction(text)` — detect clone instructions.
- `findTodoHits(files)` — locate TODO markers.
- `formatHuman(result)` — terminal-friendly output.
- `PACKAGE`, `SKIP_DIRS` — package and scanner metadata.
- `GistfoldFile`, `FoldOptions`, `FoldResult` — documented TypeScript types.

## CLI from source

```bash
git clone https://github.com/theworker02/gistfold.git
cd gistfold
node src/cli.js --help
```

## Development

```bash
node --test
```

## Publishing

The canonical public package is JSR `@theworker02/gistfold`, published through GitHub Actions trusted publishing.

## License

[MIT](LICENSE) © 2026 theworker02
