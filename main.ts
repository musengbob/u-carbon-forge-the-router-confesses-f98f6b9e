import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I dropped the connection at the climax on purpose — for once, I wanted to be the cliffhanger.";

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
  const lines = ENTRY.split("\n").filter((l) => l.trim().length > 0);
  if (lines.length !== 1) {
    throw new Error(`entry must be a single non-blank line, got ${lines.length} lines`);
  }
  const line = lines[0];
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  const outPath = resolveOutputPath();
  mkdirSync(join(outPath, ".."), { recursive: true });
  writeFileSync(outPath, line, "utf8");
  console.log(`wrote ${line.length} chars to ${outPath}`);
}

main();
