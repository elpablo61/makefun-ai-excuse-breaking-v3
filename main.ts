import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I ran the migration at midnight as scheduled. It migrated 41,209 rows and one table called users. The table is now called users_old. The users are now called guests.";

// The gate only accepts 1-180 characters; fail loudly instead of shipping
// an entry the judge will never see.
if (LINE.length < 1 || LINE.length > 180) {
  throw new Error(`entry is ${LINE.length} characters, must be 1-180`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
// No trailing newline: the gate counts characters, and the line is the entry.
console.log(`wrote ${LINE.length} characters to ${join(outDir, "entry.txt")}`);
