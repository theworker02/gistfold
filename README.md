# gistfold


---

## License & acquisition

This project is **proprietary**. Production use, redistribution, and commercial deployment require a written commercial license or completed acquisition. See [LICENSE](./LICENSE) and [ACQUISITION.md](./ACQUISITION.md). Contact [@theworker02](https://github.com/theworker02).


<img src="docs/logo.svg" alt="gistfold mark" width="96" height="96">

**Validate whether a small source folder is complete enough to share as a gist, example, or workshop artifact.**

[![JSR](https://jsr.io/badges/@theworker02/gistfold)](https://jsr.io/@theworker02/gistfold)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)

**Package:** [`@theworker02/gistfold`](https://jsr.io/@theworker02/gistfold) Ã‚Â· **Site:** [GitHub Pages](https://theworker02.github.io/gistfold/) Ã‚Â· **Source:** [`theworker02/gistfold`](https://github.com/theworker02/gistfold)

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

- `foldCheck(dir, options)` Ã¢â‚¬â€ validate a folder.
- `listEntries(dir, options)` Ã¢â‚¬â€ enumerate scanned files.
- `hasCloneInstruction(text)` Ã¢â‚¬â€ detect clone instructions.
- `findTodoHits(files)` Ã¢â‚¬â€ locate TODO markers.
- `formatHuman(result)` Ã¢â‚¬â€ terminal-friendly output.
- `PACKAGE`, `SKIP_DIRS` Ã¢â‚¬â€ package and scanner metadata.
- `GistfoldFile`, `FoldOptions`, `FoldResult` Ã¢â‚¬â€ documented TypeScript types.

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

[MIT](LICENSE) Ã‚Â© 2026 theworker02

## Status

gistfold is actively packaged for commercial licensing and acquisition diligence. See [ACQUISITION.md](./ACQUISITION.md) and [docs/acquisition/](./docs/acquisition/).
