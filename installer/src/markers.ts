export interface MarkerStyle {
  start: string;
  end: string;
}

/** HTML comments for Markdown files (ADR-013). */
export const HTML: MarkerStyle = { start: "<!-- AI-CONTEXT-KIT:START -->", end: "<!-- AI-CONTEXT-KIT:END -->" };
/** YAML has no HTML comments; openspec/config.yaml uses comment lines. */
export const YAML: MarkerStyle = { start: "# ai-context-kit:start", end: "# ai-context-kit:end" };

export const START = HTML.start;
export const END = HTML.end;

export function styleFor(path: string): MarkerStyle {
  return /\.ya?ml$/.test(path) ? YAML : HTML;
}

function escape(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function pattern(style: MarkerStyle): RegExp {
  return new RegExp(`${escape(style.start)}\\r?\\n([\\s\\S]*?)(?:\\r?\\n)?${escape(style.end)}`);
}

/** The body between the markers with LF line endings, or undefined when the file has no block. */
export function readBlock(text: string, style: MarkerStyle = HTML): string | undefined {
  return pattern(style).exec(text)?.[1].replace(/\r\n/g, "\n");
}

/** Text with the kit block removed, to check what the user owns. */
export function outsideBlock(text: string, style: MarkerStyle = HTML): string {
  return text.replace(pattern(style), "");
}

/**
 * Puts the body inside the markers. Text outside them is never changed, byte for byte:
 * the block uses the file's own line ending (CRLF when the file has any CRLF).
 */
export function writeBlock(text: string | undefined, body: string, style: MarkerStyle = HTML): string {
  const eol = text?.includes("\r\n") ? "\r\n" : "\n";
  const block = [style.start, ...body.split("\n"), style.end].join(eol);
  const re = pattern(style);
  if (text === undefined || text === "") return `${block}${eol}`;
  if (re.test(text)) return text.replace(re, () => block);
  const sep = text.endsWith(eol + eol) ? "" : text.endsWith(eol) || text.endsWith("\n") ? eol : eol + eol;
  return `${text}${sep}${block}${eol}`;
}
