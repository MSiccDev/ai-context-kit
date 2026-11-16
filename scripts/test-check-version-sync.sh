#!/usr/bin/env bash
# Tests scripts/check-version-sync.sh against throwaway fixture repos.
# Usage: scripts/test-check-version-sync.sh
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
check="$here/check-version-sync.sh"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

failures=0

# make_fixture <dir> <claude-version> <marketplace-version> <codex-version> <changelog-version>
make_fixture() {
  local dir="$1"
  mkdir -p "$dir/.claude-plugin" "$dir/.codex-plugin"
  printf '{"name":"ai-context-kit","version":"%s"}\n' "$2" > "$dir/.claude-plugin/plugin.json"
  printf '{"plugins":[{"name":"other","version":"9.9.9"},{"name":"ai-context-kit","version":"%s"}]}\n' "$3" > "$dir/.claude-plugin/marketplace.json"
  printf '{"name":"ai-context-kit","version":"%s"}\n' "$4" > "$dir/.codex-plugin/plugin.json"
  printf '# Changelog\n\n## [Unreleased]\n\n## [%s] - 2026-01-01\n\n## [0.0.1] - 2025-01-01\n' "$5" > "$dir/CHANGELOG.md"
}

# expect <name> <expected-exit> <claude> <marketplace> <codex> <changelog>
expect() {
  local name="$1" want="$2" got=0
  local dir="$work/$name"
  make_fixture "$dir" "$3" "$4" "$5" "$6"
  bash "$check" "$dir" >/dev/null 2>&1 || got=$?
  if [[ "$got" == "$want" ]]; then
    echo "pass  $name"
  else
    echo "FAIL  $name: expected exit $want, got $got"
    failures=$((failures + 1))
  fi
}

# expect_version <version> <expected-exit>: the same version in every source.
expect_version() {
  expect "version '$1'" "$2" "$1" "$1" "$1" "$1"
}

# In sync
expect_version "1.5.3" 0
expect_version "0.0.0" 0
expect_version "10.20.30" 0
expect_version "1.5.3-alpha" 0
expect_version "1.5.3-alpha.1" 0
expect_version "1.5.3-0.3.7" 0
expect_version "1.5.3-x-y-z.--" 0
expect_version "1.5.3+build.1" 0
expect_version "1.5.3-rc.1+build.5114f85" 0

# Not semantic versions
expect_version "01.5.3" 1
expect_version "1.05.3" 1
expect_version "1.5.03" 1
expect_version "1.5" 1
expect_version "v1.5.3" 1
expect_version "1.5.3-" 1
expect_version "1.5.3-alpha..1" 1
expect_version "1.5.3-01" 1
expect_version "1.5.3+" 1
expect_version "1.5.3+build..1" 1

# Drift between sources
expect "claude manifest drift" 1 "1.5.4" "1.5.3" "1.5.3" "1.5.3"
expect "marketplace drift" 1 "1.5.3" "1.5.4" "1.5.3" "1.5.3"
expect "codex manifest drift" 1 "1.5.3" "1.5.3" "1.5.4" "1.5.3"
expect "changelog drift" 1 "1.5.3" "1.5.3" "1.5.3" "1.5.4"

# Missing file
mkdir -p "$work/missing"
got=0
bash "$check" "$work/missing" >/dev/null 2>&1 || got=$?
if [[ "$got" == 2 ]]; then
  echo "pass  missing manifest"
else
  echo "FAIL  missing manifest: expected exit 2, got $got"
  failures=$((failures + 1))
fi

if [[ $failures -gt 0 ]]; then
  echo "$failures test(s) failed"
  exit 1
fi
echo "all tests passed"
