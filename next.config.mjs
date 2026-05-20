/** @type {import('next').NextConfig} */

// `npm run build:static` sets BUILD_STATIC=true.
const isStatic = process.env.BUILD_STATIC === "true";

// SITE_BASE_PATH lets you choose between:
//   ""        — site is served from the root of a custom domain
//                (e.g. https://bharatarashtracockroaches.org/)         ← default
//   "/BRC"    — site is served from a GitHub project page
//                (e.g. https://username.github.io/BRC/)
// Keep it empty and add a CNAME for a clean custom-domain deployment.
const rawBasePath = (process.env.SITE_BASE_PATH || "").trim();
const basePath = rawBasePath && rawBasePath !== "/"
  ? (rawBasePath.startsWith("/") ? rawBasePath : `/${rawBasePath}`).replace(/\/$/, "")
  : "";

// Where the deployed static frontend lives. Read by client code through
// NEXT_PUBLIC_API_BASE. Empty means "same origin", which is what the
// dev server and the dynamic Fly deployment want.
const apiBase = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/+$/, "");

const nextConfig = {
  reactStrictMode: true,

  // For GitHub Pages we statically export.
  ...(isStatic && {
    output: "export",
    basePath,
    assetPrefix: basePath ? `${basePath}/` : undefined,
    trailingSlash: true,
  }),

  images: {
    // GitHub Pages cannot run the Next image optimiser.
    unoptimized: isStatic,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },

  // Server actions are only used by the dynamic build.
  ...(!isStatic && {
    // Emit a self-contained server in .next/standalone so the Dockerfile
    // can COPY it without bundling node_modules.
    output: "standalone",
    experimental: {
      serverActions: {
        bodySizeLimit: "200mb",
      },
    },
  }),

  // Expose the basePath, static flag and the absolute backend URL to the
  // browser. Components read these via process.env.NEXT_PUBLIC_*.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC: isStatic ? "true" : "false",
    NEXT_PUBLIC_API_BASE: apiBase,
  },
};

export default nextConfig;
