import { mkdir, copyFile } from "node:fs/promises";
await mkdir("public", { recursive: true });
for (const file of ["index.html", "styles.css", "app.js", "favicon.png"])
  await copyFile(file, "public/" + file);
