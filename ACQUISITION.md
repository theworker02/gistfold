# Acquisition Brief â€” gistfold

**Date:** 2026-09-22  
**Repository:** https://github.com/theworker02/gistfold  
**Default branch:** `main`  
**Primary language:** JavaScript  
**Status:** Diligence briefing only. **No acquisition has occurred** by virtue of this file.  
**License:** Proprietary â€” sale, written commercial license, or completed asset transfer required (see root `LICENSE`).  
**Valuation:** Not stated.  
**Contact:** GitHub [@theworker02](https://github.com/theworker02) Â· [thanks.dev/u/gh/theworker02](https://thanks.dev/u/gh/theworker02)

> Cloning or forking this repository does **not** grant production, redistribution, SaaS, OEM, or commercial rights.

---

## 1. Executive thesis

This project is **proprietary**. Production use, redistribution, and commercial deployment require a written commercial license or completed acquisition. See [LICENSE](./LICENSE) and [ACQUISITION.md](./ACQUISITION.md). Contact [@theworker02](https://github.com/theworker02). <img src="docs/logo.svg" alt="gistfold mark" width="96" height="96"> **Validate whether a small source folder is complete enough to share as a gist, example, or workshop artifact.**

**Why a buyer cares:** gistfold packages transferable product IP â€” source, docs, in-repo brand assets, and a diligence room under `docs/acquisition/` â€” under a clear proprietary posture so diligence can proceed without mistaking the repo for open source.

---

## 2. Product snapshot

| Item | Detail |
|------|--------|
| Product | gistfold |
| Repo | `theworker02/gistfold` |
| Language | JavaScript |
| Open source? | **No** â€” proprietary |
| Rightsholder | theworker02 |
| Diligence pack | `docs/acquisition/` |

### Capability highlights (from current materials)

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

---

## 3. Problem / opportunity

Teams evaluating gistfold typically need either (a) a commercial right to run or embed it, or (b) outright ownership of the Product IP for strategic build-out. Public GitHub visibility without a proprietary license creates false assumptions about free production use. This brief and the linked data room make the commercial path explicit.

---

## 4. What ships today

Honest maturity: treat repository contents, README claims, tests, and release tags as the source of truth. Do not assume production customers, ARR, filed patents, or SLAs unless separately evidenced in diligence.

Typical transferable surfaces:

- Source tree and build/test scripts present in-repo
- Documentation and design notes
- Acquisition / diligence markdown under `docs/acquisition/`
- Branding assets committed to the repository (if any)

---

## 5. Demo / evaluation path (buyer)

Minimal path (no secrets required unless README says otherwise):

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

Extended evaluation: `docs/acquisition/BUYER_EVALUATION.md`. Written NDA / evaluation grants may be required for private materials.

---

## 6. What a transaction typically includes

Subject to definitive schedules:

| Included (typical) | Excluded (typical) |
|--------------------|--------------------|
| Repo materials + asserted original IP | Seller personal accounts / unrelated repos |
| Docs + diligence room at closing | Third-party dependency source under separate licenses |
| In-repo brand marks as assigned | Secrets without rotation plan |
| Know-how captured in docs | Fabricated revenue, user, or adoption metrics |

---

## 7. Suggested deal structures

| Structure | When it fits |
|-----------|--------------|
| Non-exclusive commercial license | Deploy/run under seat or environment terms |
| Exclusive field-of-use license | Buyer wants exclusivity; seller may retain entity |
| Asset / IP assignment | Buyer wants ownership of Materials outright |
| OEM / redistribution | Separate agreement â€” not implied here |

Commercial terms (price, earnouts, escrow) are negotiated under NDA with counsel.

---

## 8. Buyer diligence checklist

- [ ] Confirm Rightsholder identity and authority to sell/license
- [ ] Inventory Materials (`docs/acquisition/ASSET_INVENTORY.md`)
- [ ] Review IP posture (`IP_PROVENANCE.md`) and dependencies (`DEPENDENCY_INVENTORY.md`)
- [ ] Run evaluation script (`BUYER_EVALUATION.md`)
- [ ] Review risks (`RISK_REGISTER.md`)
- [ ] Agree transfer scope (`TRANSFER_MANIFEST.md`) and handoff (`HANDOFF_CHECKLIST.md`)
- [ ] Supersede root `LICENSE` at closing via definitive agreement

---

## 9. Related documents

| Document | Purpose |
|----------|---------|
| `LICENSE` | Proprietary â€” no default grant |
| `docs/acquisition/README.md` | Data-room index |
| `docs/acquisition/EXECUTIVE_SUMMARY.md` | One-page thesis |
| `README.md` | Product overview |
| `SECURITY.md` | Vulnerability reporting |
| `COMMERCIAL.md` | Licensing contact path |
| `.github/FUNDING.yml` | Sponsors / thanks.dev |

---

## 10. Disclaimer

This package is informational and **does not** create a binding offer, grant of rights, or investment advice. Engage counsel for any transaction.

---

*Document version: 2.0.0 / 2026-09-22 Â· Classification: acquisition briefing*
