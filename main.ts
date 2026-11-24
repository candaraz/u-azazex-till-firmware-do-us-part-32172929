import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const VOW =
  "I vow to give you my only USB port, because you are worth every device I will never plug in again.";

// Guards: the entry must be exactly one sentence, 1-200 chars, one line.
if (VOW.length < 1 || VOW.length > 200) {
  throw new Error(`vow length ${VOW.length} outside the 1-200 gate`);
}
if (VOW.split(".").length - 1 !== 1 || /[!?]/.test(VOW)) {
  throw new Error("vow must be strictly one sentence");
}
if (VOW.includes("\n")) {
  throw new Error("vow must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, VOW, "utf8");

// Read back and confirm the file is byte-identical to the vow.
const written = readFileSync(entryPath, "utf8");
if (written !== VOW) {
  throw new Error("entry.txt does not match the vow byte-for-byte");
}
console.log(`wrote ${entryPath}`);
