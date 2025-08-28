// scripts/convert-biography.js
import { execSync } from "child_process";
import path from "path";

const input = path.join(process.cwd(), "biography.docx");   // your Word file
const output = path.join(process.cwd(), "public/biography.html"); // converted HTML

try {
  console.log("🔄 Converting biography.docx → biography.html...");
  execSync(`pandoc "${input}" -f docx -t html -s -o "${output}"`, { stdio: "inherit" });
  console.log("✅ biography.html created in /public");
} catch (err) {
  console.error("❌ Failed to convert biography.docx", err);
  process.exit(1);
}
