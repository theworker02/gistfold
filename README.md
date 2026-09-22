# gistfold


---

## License & acquisition

This project is **proprietary**. Production use, redistribution, and commercial deployment require a written commercial license or completed acquisition. See [LICENSE](./LICENSE) and [ACQUISITION.md](./ACQUISITION.md). Contact [@theworker02](https://github.com/theworker02).


<img src="docs/logo.svg" alt="gistfold mark" width="96" height="96">

**Validate whether a small source folder is complete enough to share as a gist, example, or workshop artifact.**

[![JSR](https://jsr.io/badges/@theworker02/gistfold)](https://jsr.io/@theworker02/gistfold)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license proprietary](https://img.shields.io/badge/license-Proprietary%20(source--available)-0B1F33)

**Package:** [`@theworker02/gistfold`](https://jsr.io/@theworker02/gistfold)  ·  **Site:** [GitHub Pages](https://theworker02.github.io/gistfold/)  ·  **Source:** [`theworker02/gistfold`](https://github.com/theworker02/gistfold)

## Purpose

Check whether a small folder looks ready to publish as a gist, workshop drop, or example repo: README present, example file, separate implementation file, and optional strict clone/TODO rules.


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

## Development

```bash
node --test
```

## Publishing

The canonical public package is JSR `@theworker02/gistfold`, published through GitHub Actions trusted publishing.



## CLI examples

Run from a cloned repository (Node 18+):

```bash
git clone https://github.com/theworker02/gistfold.git
cd gistfold
node src/cli.js
node src/cli.js ./my-snippet
node src/cli.js check --recurse --strict ./workshop
node src/cli.js list --json ./workshop
```

See `node src/cli.js --help` for flags and exit codes.

## Limitations

- Heuristic layout rules (`example.*` naming) may not fit every repo structure.
- Strict mode is opinionated; disable flags when teaching repos use different conventions.
- Scans file contents for the substring `TODO`, not structured task trackers.

## Documentation

- [JSR package and generated API docs](https://jsr.io/@theworker02/gistfold)
- [Project site](https://theworker02.github.io/gistfold/)
- [Source repository](https://github.com/theworker02/gistfold)

## License

**Source-available proprietary** — evaluation under [LICENSE](./LICENSE); commercial / production use via [COMMERCIAL.md](./COMMERCIAL.md). See [LICENSE_TRANSITION_NOTICE.md](./LICENSE_TRANSITION_NOTICE.md) and [NOTICE](./NOTICE).


## Status

gistfold is actively packaged for commercial licensing and acquisition diligence. See [ACQUISITION.md](./ACQUISITION.md) and [docs/acquisition/](./docs/acquisition/).

