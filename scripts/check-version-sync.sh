#!/usr/bin/env bash
# Checks that every plugin manifest carries the same release version and that
# CHANGELOG.md has a matching release entry.
#
# Usage: scripts/check-version-sync.sh   (run from anywhere inside the repo)
# Exit codes: 0 in sync, 1 drift found, 2 missing tool or file.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

if ! command -v jq >/dev/null 2>&1; then
  echo "error: jq is required" >&2
  exit 2
fi

# Manifest file and the jq path to its version field.
manifests=(
  ".claude-plugin/plugin.json|.version"
  ".claude-plugin/marketplace.json|.plugins[] | select(.name == \"ai-context-kit\") | .version"
  ".codex-plugin/plugin.json|.version"
)

semver='^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.-]+)?$'
status=0
expected=""

for entry in "${manifests[@]}"; do
  file="${entry%%|*}"
  path="${entry#*|}"
  if [[ ! -f "$file" ]]; then
    echo "error: $file not found" >&2
    exit 2
  fi
  version="$(jq -r "$path // empty" "$file")"
  if [[ -z "$version" ]]; then
    echo "FAIL $file: no version at '$path'"
    status=1
    continue
  fi
  if [[ ! "$version" =~ $semver ]]; then
    echo "FAIL $file: '$version' is not a semantic version"
    status=1
  fi
  echo "     $file: $version"
  if [[ -z "$expected" ]]; then
    expected="$version"
  elif [[ "$version" != "$expected" ]]; then
    echo "FAIL $file: $version does not match $expected"
    status=1
  fi
done

# The newest released heading in the changelog, skipping [Unreleased].
changelog_version="$(grep -oE '^## \[[0-9]+\.[0-9]+\.[0-9]+[^]]*\]' CHANGELOG.md | head -n 1 | sed -E 's/^## \[(.*)\]$/\1/' || true)"
if [[ -z "$changelog_version" ]]; then
  echo "FAIL CHANGELOG.md: no released version heading found"
  status=1
else
  echo "     CHANGELOG.md (latest release): $changelog_version"
  if [[ -n "$expected" && "$changelog_version" != "$expected" ]]; then
    echo "FAIL CHANGELOG.md: latest release $changelog_version does not match manifests ($expected)"
    status=1
  fi
fi

if [[ $status -eq 0 ]]; then
  echo "OK   all versions are $expected"
fi
exit $status
