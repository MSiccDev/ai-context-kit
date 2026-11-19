export const START = "<!-- AI-CONTEXT-KIT:START -->";
export const END = "<!-- AI-CONTEXT-KIT:END -->";

const BLOCK = new RegExp(`${escape(START)}\\n([\\s\\S]*?)\\n?${escape(END)}`);

function escape(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** The body between the markers, or undefined when the file has no block. */
export function readBlock(text: string): string | undefined {
  return BLOCK.exec(text)?.[1];
}

/** Puts the body inside the markers; text outside them is never changed. */
export function writeBlock(text: string | undefined, body: string): string {
  const block = `${START}\n${body}\n${END}`;
  if (text === undefined || text === "") return `${block}\n`;
  if (BLOCK.test(text)) return text.replace(BLOCK, () => block);
  const sep = text.endsWith("\n\n") ? "" : text.endsWith("\n") ? "\n" : "\n\n";
  return `${text}${sep}${block}\n`;
}
