export interface ExecResult {
  status: number | null;
  stdout: string;
  stderr: string;
  error?: Error & { code?: string };
}

export type Exec = (cmd: string, args: string[], opts: { cwd: string; env: Record<string, string | undefined> }) => ExecResult;

export interface Io {
  cwd: string;
  stdout: (line: string) => void;
  stderr: (line: string) => void;
  /** Node version to check against; defaults to the running process. */
  nodeVersion?: string;
  /** Runs a command without a shell (tests pass a fake). */
  exec?: Exec;
  /** Asks the user a question and returns the answer. */
  ask?: (question: string) => Promise<string>;
  /** Whether the user can be asked; false in CI and with --yes. */
  interactive?: boolean;
}

export class UsageError extends Error {}
