---
name: "well-formed-example"
description: "Reformats Markdown tables so columns are padded and pipe-aligned. Use when a Markdown table's columns are ragged or inconsistently spaced and need to be made readable."
version: "1.0.0"
---

# Well Formed Example

## Purpose
Realigns the columns of a Markdown table so every pipe (`|`) in a column lines up and every cell is padded to the width of its column's widest entry. Improves readability of Markdown source without changing the table's rendered output.

## When To Use
- Use this skill when a Markdown table's column separators are ragged, unpadded, or inconsistently spaced.
- Use this skill after editing a table (adding/removing rows or columns) that has fallen out of alignment.
- Do not use this skill on tables inside fenced code blocks, since those are literal text and must not be reformatted.
- Do not use this skill for non-table Markdown content (lists, headings, prose) — it only applies to pipe tables.

## Required Inputs
- The Markdown source containing one or more pipe tables to reformat.
- Confirmation of which specific table(s) to reformat, if the document contains more than one.

## Workflow
1. Identify the target table's header row, delimiter row, and body rows.
2. Determine the maximum rendered width of each column across the header, delimiter, and all body rows.
3. Pad every cell in each column to that column's maximum width, keeping a single space on each side of the cell content.
4. Rebuild the delimiter row using dashes sized to match each column's padded width, preserving any left/right/center alignment markers (`:---`, `:---:`, `---:`) already present.
5. Reassemble the table and verify the rendered output is unchanged from before reformatting — only the raw source spacing should differ.

## Output Expectations
- The table renders identically to the original when viewed as Markdown.
- Every row's pipe characters are vertically aligned in the raw source.
- Existing column alignment markers are preserved exactly.
- No content, rows, or columns are added, removed, or reordered.

## Resources
- No external references are required; this skill is self-contained.

## Constraints And Safety
- Only touch pipe tables; leave surrounding prose, headings, and code blocks untouched.
- Do not reformat tables embedded inside fenced code blocks.
- Preserve the exact cell content and alignment markers — only whitespace padding may change.
- This workflow is plain-text Markdown manipulation and works the same in any editor, terminal, or AI assistant capable of reading and writing text files.
