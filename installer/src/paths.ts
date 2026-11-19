import { lstatSync } from "node:fs";
import { join } from "node:path";

/** A path the installer must not touch: outside the repository, or reached through a symbolic link. */
export class UnsafePathError extends Error {
  constructor(
    readonly path: string,
    readonly reason: "invalid" | "symlink",
    message: string,
  ) {
    super(message);
  }
}

/**
 * Checks that a managed path is a plain relative path inside the repository:
 * forward slashes only, no empty, "." or ".." segments, not absolute, no drive letter.
 */
export function checkRelative(path: unknown): asserts path is string {
  const ok =
    typeof path === "string" &&
    path.length > 0 &&
    !path.includes("\\") &&
    !path.includes("\0") &&
    !path.startsWith("/") &&
    !/^[A-Za-z]:/.test(path) &&
    path.split("/").every((s) => s !== "" && s !== "." && s !== "..");
  if (!ok) {
    throw new UnsafePathError(String(path), "invalid", `Unsafe path ${JSON.stringify(path)}: must stay inside the repository.`);
  }
}

/**
 * Returns the absolute path for a managed relative path, after checking that no existing
 * part of it below the repository root is a symbolic link (or junction).
 */
export function guard(root: string, path: string): string {
  checkRelative(path);
  let current = root;
  for (const segment of path.split("/")) {
    current = join(current, segment);
    let isLink = false;
    try {
      isLink = lstatSync(current).isSymbolicLink();
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") break;
      throw e;
    }
    if (isLink) {
      throw new UnsafePathError(path, "symlink", `Refusing ${path}: ${current} is a symbolic link.`);
    }
  }
  return join(root, path);
}
