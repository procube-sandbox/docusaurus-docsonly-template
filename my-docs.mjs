#!/usr/bin/env node

const { spawn } = require("node:child_process");
const MY_DOCS_PATH = process.env.MY_DOCS_PATH || process.cwd();
process.env.MY_DOCS_PATH = MY_DOCS_PATH;

const p = spawn("npx", ["docusaurus", ...process.argv.slice(2)], {
  stdio: "inherit",
  cwd: __dirname,
});
p.on("close", (code) => process.exit(code));
