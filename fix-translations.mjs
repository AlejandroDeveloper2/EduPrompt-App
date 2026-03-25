import fs from "fs";
import path from "path";

function getFiles(dir, extensions, ignore = ["node_modules", ".git", ".expo"]) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (ignore.includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results = results.concat(getFiles(fullPath, extensions, ignore));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }

  return results;
}

const files = getFiles(".", [".ts", ".tsx"]);

let totalFiles = 0;
let totalReplacements = 0;

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");

  // Flag 'gs': g = global, s = dotAll (el punto también matchea saltos de línea)
  const updated = content.replace(
    /\b(?:i18n\.)?t\(\s*([`'"])([^`'"]+)\1\s*\)/gs,
    (match, quote, key) => {
      const fixed = key.replace(/-/g, "_");
      if (fixed !== key) totalReplacements++;
      // Reconstruir respetando el salto de línea original si lo había
      return match.replace(key, fixed);
    },
  );

  if (content !== updated) {
    fs.writeFileSync(file, updated, "utf8");
    console.log(`✅ ${file}`);
    totalFiles++;
  }
}

console.log(`\n📁 Archivos modificados: ${totalFiles}`);
console.log(`🔄 Reemplazos realizados: ${totalReplacements}`);
