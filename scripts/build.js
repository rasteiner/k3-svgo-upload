#!/usr/bin/env node

const path = require("path");
const esbuild = require("esbuild");

const watch = process.argv.includes("--watch");

esbuild.build({
  entryPoints: [
    path.resolve(__dirname, "../src/index.ts"),
  ],
  outdir: path.resolve(__dirname, "../"),
  minify: !watch,
  watch: watch,
  bundle: true,
  sourcemap: watch,
  format: "iife",
});
