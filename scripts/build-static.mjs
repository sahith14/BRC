#!/usr/bin/env node
// Builds the public-facing site as a static export for GitHub Pages.
//
// Two deployment shapes are supported via env:
//
//   SITE_DOMAIN          e.g. "bharatarashtracockroaches.org"
//                        When set, a CNAME file is dropped into ./out so
//                        GitHub Pages serves the site on that custom domain.
//
//   SITE_BASE_PATH       e.g. "/BRC" (project pages on github.io/USER/BRC).
//                        Leave empty for a custom-domain root deploy.
//
//   NEXT_PUBLIC_API_BASE e.g. "https://api.bharatarashtracockroaches.org"
//                        Where the dynamic backend lives. Empty → static
//                        frontend gracefully simulates form submissions.
//
// Before running `next build` we temporarily move:
//   - src/middleware.ts          (not supported by `output: 'export'`)
//   - src/app/admin              (uses MongoDB, server actions, cookies)
//   - src/app/api                (server-only route handlers)
//
// They are always restored — even if the build fails — so the local dev
// experience and Fly/Vercel deployments are untouched.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SITE_DOMAIN = (process.env.SITE_DOMAIN || "").trim();
const SITE_BASE_PATH = (process.env.SITE_BASE_PATH || "").trim();
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || "").trim();

const moves = [
  {
    live: path.join(root, "src", "middleware.ts"),
    parked: path.join(root, "src", "middleware.ts.static-bak"),
    label: "middleware.ts",
  },
  {
    live: path.join(root, "src", "app", "admin"),
    parked: path.join(root, "src", "app", "_admin_skip"),
    label: "src/app/admin",
  },
  {
    live: path.join(root, "src", "app", "api"),
    parked: path.join(root, "src", "app", "_api_skip"),
    label: "src/app/api",
  },
];

function park() {
  for (const m of moves) {
    if (fs.existsSync(m.live)) {
      fs.renameSync(m.live, m.parked);
      console.log(`  parked  ${m.label}`);
    }
  }
}

function restore() {
  for (const m of moves) {
    if (fs.existsSync(m.parked)) {
      fs.renameSync(m.parked, m.live);
      console.log(`  restored ${m.label}`);
    }
  }
}

console.log("» Building static export for GitHub Pages…");
console.log(`  base path: ${SITE_BASE_PATH || "(root)"}`);
console.log(`  domain:    ${SITE_DOMAIN || "(none — using github.io URL)"}`);
console.log(`  api base:  ${API_BASE || "(none — UI will simulate submissions)"}`);

let buildFailed = false;
try {
  // Clean previous output.
  const outDir = path.join(root, "out");
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  const nextDir = path.join(root, ".next");
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true });
  }

  console.log("\n» Parking server-only files…");
  park();

  console.log("\n» Running next build (BUILD_STATIC=true)…\n");
  const result = spawnSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["next", "build"],
    {
      cwd: root,
      env: {
        ...process.env,
        BUILD_STATIC: "true",
        SITE_BASE_PATH,
        NEXT_PUBLIC_API_BASE: API_BASE,
      },
      stdio: "inherit",
      shell: true,
    }
  );

  if (result.status !== 0) {
    buildFailed = true;
    throw new Error(`next build exited with code ${result.status}`);
  }

  // .nojekyll prevents GitHub Pages from feeding the export through Jekyll
  // (which strips files starting with an underscore — Next emits some).
  fs.writeFileSync(path.join(outDir, ".nojekyll"), "");

  // CNAME pins the GitHub Pages site to the custom domain.
  if (SITE_DOMAIN) {
    fs.writeFileSync(path.join(outDir, "CNAME"), SITE_DOMAIN + "\n");
    console.log(`  wrote out/CNAME → ${SITE_DOMAIN}`);
  }

  // Friendly 404 — copy the home page if a 404.html was not produced.
  const fourOhFour = path.join(outDir, "404.html");
  if (!fs.existsSync(fourOhFour)) {
    const indexHtml = path.join(outDir, "index.html");
    if (fs.existsSync(indexHtml)) {
      fs.copyFileSync(indexHtml, fourOhFour);
    }
  }

  console.log("\n✓ Static export ready in ./out");
  if (SITE_BASE_PATH) {
    console.log(`  → preview: npx serve out -l 5050 (then visit ${SITE_BASE_PATH}/)`);
  } else {
    console.log("  → preview: npx serve out -l 5050");
  }
} catch (err) {
  console.error("\n✗ Static build failed:", err && err.message ? err.message : err);
} finally {
  console.log("\n» Restoring server-only files…");
  restore();
}

if (buildFailed) process.exit(1);
