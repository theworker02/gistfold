const HELP = `gistfold 1.00 (1.0.0)

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
`;

const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
