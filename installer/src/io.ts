export interface Io {
  cwd: string;
  stdout: (line: string) => void;
  stderr: (line: string) => void;
  /** Node version to check against; defaults to the running process. */
  nodeVersion?: string;
}

export class UsageError extends Error {}
