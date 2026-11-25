// Till Firmware Do Us Part — entry copier.
// Reads the vow stored beside this script and places a byte-exact copy
// into the output directory named by MAKEFUN_OUTPUT_DIR.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const vowBytes = readFileSync(join(scriptDir, "entry.txt"));

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(scriptDir, "out");
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
writeFileSync(join(outDir, "entry.txt"), vowBytes);
