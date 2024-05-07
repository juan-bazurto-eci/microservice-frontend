/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  reactStrictMode: true,
  pageExtensions: [
    "mdx",
    "md",
    "jsx",
    "js",
    "tsx",
    "ts",
    "atom.tsx",
    "molecule.tsx",
    "page.tsx",
    "page.ts",
    "page.jsx",
    "page.js",
  ],
  compiler: {
    styledComponents: true,
  },
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
