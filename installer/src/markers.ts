export const START = "<!-- AI-CONTEXT-KIT:START -->";
export const END = "<!-- AI-CONTEXT-KIT:END -->";

const BLOCK = new RegExp(`${escape(START)}\\r?\\n([\\s\\S]*?)(?:\\r?\\n)?${escape(END)}`);

function escape(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** The body between the markers with LF line endings, or undefined when the file has no block. */
export function readBlock(text: string): string | undefined {
  return BLOCK.exec(text)?.[1].replace(/\r\n/g, "\n");
}

/**
 * Puts the body inside the markers. Text outside them is never changed, byte for byte:
 * the block uses the file's own line ending (CRLF when the file has any CRLF).
 */
export function writeBlock(text: string | undefined, body: string): string {
  const eol = text?.includes("\r\n") ? "\r\n" : "\n";
  const block = [START, ...body.split("\n"), END].join(eol);
  if (text === undefined || text === "") return `${block}${eol}`;
  if (BLOCK.test(text)) return text.replace(BLOCK, () => block);
  const sep = text.endsWith(eol + eol) ? "" : text.endsWith(eol) || text.endsWith("\n") ? eol : eol + eol;
  return `${text}${sep}${block}${eol}`;
}
