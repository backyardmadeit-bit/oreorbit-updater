"""Rough PHP syntax guard for machines without a PHP CLI.

Usage: php_balance.py FILE.php [...]

Strips comments, strings and heredocs, then checks that (), [] and {} are balanced and properly
nested. It catches the typical slip of an edit (a lost brace or bracket); it is not a parser, so
`php -l` still wins where it exists (CI). Exit code 1 if any file is unbalanced.
"""
import re
import sys

STRIP = re.compile(
    r"<<<\s*['\"]?(\w+)['\"]?\n.*?\n\s*\1\b"   # heredoc / nowdoc
    r"|/\*.*?\*/"                               # block comment
    r"|(?://|#(?!\[))[^\n]*"                    # line comment (not #[attribute])
    r"|'(?:\\.|[^'\\])*'"                       # single-quoted string
    r"|\"(?:\\.|[^\"\\])*\"",                   # double-quoted string
    re.S,
)
PAIRS = {")": "(", "]": "[", "}": "{"}


def check(path):
    src = open(path, encoding="utf-8", errors="replace").read()
    # only PHP code: drop inline HTML outside <?php ... ?>
    code = "".join(re.findall(r"<\?(?:php|=)?(.*?)(?:\?>|\Z)", src, re.S))
    code = STRIP.sub(lambda m: "\n" * m.group(0).count("\n"), code)
    stack = []
    for n, line in enumerate(code.split("\n"), 1):
        for ch in line:
            if ch in "([{":
                stack.append((ch, n))
            elif ch in PAIRS:
                if not stack or stack[-1][0] != PAIRS[ch]:
                    return "unexpected %r near code line %d" % (ch, n)
                stack.pop()
    if stack:
        return "unclosed %r from code line %d" % stack[-1]
    return None


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    bad = 0
    for p in sys.argv[1:]:
        err = check(p)
        bad += bool(err)
        print("%-28s %s" % (p, err or "balanced"))
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
