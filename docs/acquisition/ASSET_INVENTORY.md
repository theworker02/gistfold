# Asset inventory â€” gistfold

## Repository surfaces

| Asset | Location / notes |
|-------|------------------|
| Source tree | Repository root / language packages |
| Tests | `test/`, `tests/`, CI workflows if present |
| Docs | `README.md`, `docs/` |
| Diligence room | `docs/acquisition/` |
| License / notices | `LICENSE`, transition notices if present |
| Funding | `.github/FUNDING.yml` |
| CI | `.github/workflows/` if present |
| Branding | logos/assets folders if present |

## Capability highlights

- Checks for a README, example file, and separate implementation file.
- Optional recursive and strict modes.
- Detects clone instructions and TODO markers.
- Fully documented ESM API for JSR.
- Trusted GitHub Actions publishing with OIDC provenance.
- `foldCheck(dir, options)` Ã¢â‚¬â€ validate a folder.
- `listEntries(dir, options)` Ã¢â‚¬â€ enumerate scanned files.
- `hasCloneInstruction(text)` Ã¢â‚¬â€ detect clone instructions.
- `findTodoHits(files)` Ã¢â‚¬â€ locate TODO markers.
- `formatHuman(result)` Ã¢â‚¬â€ terminal-friendly output.
- `PACKAGE`, `SKIP_DIRS` Ã¢â‚¬â€ package and scanner metadata.
- `GistfoldFile`, `FoldOptions`, `FoldResult` Ã¢â‚¬â€ documented TypeScript types.

## Usually excluded

Seller personal accounts, unrelated repos, and unreissued registry tokens â€” unless listed in the definitive agreement.

*Updated: 2026-09-22*
