// Copies the kit's ack-* skills into installer/skills/ for packaging.
// Validation reports are kit-internal and are left out.
import { copyFileSync, cpSync, existsSync, readdirSync, rmSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "..", "..", "skills");
const target = join(here, "..", "skills");

if (!existsSync(source)) {
  console.error(`bundle-skills: ${source} not found`);
  process.exit(1);
}
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
let count = 0;
for (const name of readdirSync(source).sort()) {
  if (!name.startsWith("ack-")) continue;
  cpSync(join(source, name), join(target, name), {
    recursive: true,
    filter: (src) => !src.endsWith("SKILL.validation.md"),
  });
  count += 1;
}
// The bundled skills adapt third-party MIT work; their notices travel with them.
for (const file of ["LICENSE", "THIRD_PARTY_NOTICES.md"]) {
  copyFileSync(join(here, "..", "..", file), join(here, "..", file));
}
console.log(`bundle-skills: ${count} skills bundled, LICENSE and THIRD_PARTY_NOTICES.md copied`);
