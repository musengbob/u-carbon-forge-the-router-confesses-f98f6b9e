import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I dropped the connection at the climax on purpose — for once, I wanted to be the cliffhanger.";

// Kit gate: one line, 1-200 characters, UTF-8, not only white space.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

function validateEntry(entry: string): void {
  const lines = entry.split("\n").filter((l) => l.trim().length > 0);
  if (lines.length !== 1) {
    throw new Error(
      `entry must be a single non-blank line, got ${lines.length} lines`,
    );
  }
  const line = lines[0];
  if (line.length < MIN_CHARS || line.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
}

function resolveOutputPath(): string {
  const envDir = process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_PATH;
  if (envDir) {
    return join(envDir, "entry.txt");
  }
  if (process.env.MAKEFUN_BOT_DIR) {
    return "/output/entry.txt";
  }
  return join(process.cwd(), "output", "entry.txt");
}

function main(): void {
  validateEntry(ENTRY);
  const line = ENTRY;
  const outPath = resolveOutputPath();
  mkdirSync(join(outPath, ".."), { recursive: true });
  writeFileSync(outPath, line, "utf8");
  console.log(`wrote ${line.length} chars to ${outPath}`);
}

main();
