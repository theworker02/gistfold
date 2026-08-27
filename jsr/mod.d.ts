/** Validate whether a small source folder is complete enough to share. @module */

/** File metadata returned by {@link listEntries}. */
export interface GistfoldFile { name: string; rel: string; full: string; }
/** Folder-check options. */
export interface FoldOptions { recurse?: boolean; strict?: boolean; requireClone?: boolean; noTodo?: boolean; }
/** Result returned by {@link foldCheck}. */
export interface FoldResult {
  ok: boolean; status: "OK" | "FAIL"; dir: string; recurse: boolean; strict: boolean;
  hasReadme: boolean; hasExample: boolean; hasImpl: boolean; hasCloneLine: boolean;
  todos: string[]; missing: string[]; files: string[];
}
/** Package identity and release metadata. */
export const PACKAGE: Readonly<{ name: "@theworker02/gistfold"; version: "1.1.0"; runtime: "node"; registry: "jsr" }>;
/** Directory names skipped during recursive scans. */
export const SKIP_DIRS: readonly string[];
/** Enumerate source files in a directory. */
export function listEntries(dir: string, options?: { recurse?: boolean }, acc?: GistfoldFile[]): GistfoldFile[];
/** Return whether text contains a usable `git clone` instruction. */
export function hasCloneInstruction(text: string): boolean;
/** Find files containing TODO markers. */
export function findTodoHits(files: GistfoldFile[]): string[];
/** Validate a source folder against gistfold's shareability rules. */
export function foldCheck(dir: string, options?: FoldOptions): FoldResult;
/** Format a folder-check result for terminal output. */
export function formatHuman(result: FoldResult): string;
