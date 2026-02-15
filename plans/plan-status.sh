#!/usr/bin/env bash
set -euo pipefail

shopt -s nullglob
files=(plans/*.prompt.md)

if [ ${#files[@]} -eq 0 ]; then
  echo "No plan files found in plans/."
  exit 0
fi

open=()
executed=()
unknown=()

read_field() {
  local file="$1"
  local key="$2"
  awk -v target="$key" '
    NR == 1 && $0 == "---" { in_frontmatter = 1; next }
    in_frontmatter && $0 == "---" { exit }
    in_frontmatter {
      split($0, parts, ":")
      field = parts[1]
      gsub(/^[[:space:]]+|[[:space:]]+$/, "", field)
      if (field == target) {
        sub(/^[^:]*:[[:space:]]*/, "", $0)
        gsub(/^[[:space:]]+|[[:space:]]+$/, "", $0)
        print $0
        exit
      }
    }
  ' "$file"
}

for file in "${files[@]}"; do
  status="$(read_field "$file" "status" || true)"
  status="${status%\"}"
  status="${status#\"}"

  case "$status" in
    open)
      open+=("$file")
      ;;
    executed)
      executed+=("$file")
      ;;
    *)
      unknown+=("$file")
      ;;
  esac
done

print_group() {
  local title="$1"
  shift
  local items=("$@")
  echo "$title"
  if [ ${#items[@]} -eq 0 ] || { [ ${#items[@]} -eq 1 ] && [ -z "${items[0]}" ]; }; then
    echo "- none"
    return
  fi
  for item in "${items[@]}"; do
    echo "- $item"
  done
}

print_group "OPEN" "${open[@]-}"
print_group "EXECUTED" "${executed[@]-}"
print_group "UNKNOWN" "${unknown[@]-}"
