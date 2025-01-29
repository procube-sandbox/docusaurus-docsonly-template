#!/usr/bin/env node

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MY_DOCS_PATH = process.env.MY_DOCS_PATH || process.cwd();
process.env.MY_DOCS_PATH = MY_DOCS_PATH;

const p = spawn("npx", ["docusaurus", ...process.argv.slice(2)], {
  stdio: "inherit",
  cwd: __dirname,
});
p.on("close", (code) => process.exit(code));
