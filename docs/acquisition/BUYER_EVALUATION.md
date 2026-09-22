# Buyer evaluation â€” gistfold

## Goal

In 15â€“45 minutes, verify the Product builds or runs as documented and that proprietary notices are present.

## Steps

1. Confirm root `LICENSE` is proprietary and `ACQUISITION.md` exists.
2. Skim `README.md` install/run claims.
3. Execute:

```
```bash
deno add jsr:@theworker02/gistfold
```
```ts
import { foldCheck, hasCloneInstruction, PACKAGE } from "@theworker02/gistfold";

const result = foldCheck("./example", { recurse: true, strict: true });
console.log(result.ok, PACKAGE.version);
console.log(hasCloneInstruction("git clone https://github.com/example/repo.git"));
```
```bash
git clone https://github.com/theworker02/gistfold.git
cd gistfold
node src/cli.js --help
```
```bash
node --test
```
```

4. Run tests if present (`npm test`, `pytest`, `cargo test`, `go test ./...`, etc.).
5. Record README vs observed behavior gaps in workpapers.

## Pass criteria

- [ ] Clone succeeds
- [ ] Documented happy path works **or** failure is explained
- [ ] Minimal path needs no surprise secrets
- [ ] License notices intact

*Updated: 2026-09-22*
