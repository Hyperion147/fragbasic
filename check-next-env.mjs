import { loadEnvConfig } from "@next/env";
import bcrypt from "bcryptjs";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const hash = process.env.ADMIN_PASSWORD_HASH || "";
const email = process.env.ADMIN_EMAIL || "";

console.log("--- as Next.js loads .env ---");
console.log("email len", email.length);
console.log("hash len", hash.length);
console.log("hash starts $2b", hash.startsWith("$2b$"));
console.log("hash prefix", JSON.stringify(hash.slice(0, 10)));
// count $ signs - bcrypt should have multiple
console.log("dollar count", (hash.match(/\$/g) || []).length);

// If user puts DIAG_PASSWORD in environment for this run:
const plain = process.env.DIAG_PASSWORD;
if (plain) {
  console.log("bcrypt ok?", await bcrypt.compare(plain, hash));
  // also try with corrupted expansion simulation
} else {
  console.log("Run with DIAG_PASSWORD=yourplain to verify bcrypt");
}
