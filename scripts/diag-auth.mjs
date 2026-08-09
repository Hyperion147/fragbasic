import { config } from "dotenv";
config({ path: ".env" });
import bcrypt from "bcryptjs";

const email = process.env.ADMIN_EMAIL || "";
const hash = process.env.ADMIN_PASSWORD_HASH || "";
const secret = process.env.AUTH_SECRET || "";
const url = process.env.AUTH_URL || "";

console.log("ADMIN_EMAIL set:", Boolean(email), "len:", email.length);
console.log("email trim match:", email === email.trim());
console.log("email has surrounding quotes:", /^["']|["']$/.test(email));
console.log("HASH set:", Boolean(hash), "len:", hash.length);
console.log("hash starts $2:", hash.startsWith("$2"));
console.log("hash has surrounding quotes:", /^["']|["']$/.test(hash));
console.log("hash contains spaces:", /\s/.test(hash));
console.log("hash prefix chars:", JSON.stringify(hash.slice(0, 7)));
console.log("AUTH_SECRET set:", Boolean(secret), "len:", secret.length);
console.log("AUTH_URL:", url || "(empty)");

const diag = process.env.DIAG_PASSWORD;
if (diag) {
  const ok = await bcrypt.compare(diag, hash);
  console.log("bcrypt.compare(DIAG_PASSWORD):", ok);
} else {
  console.log("No DIAG_PASSWORD — skip bcrypt probe");
}
