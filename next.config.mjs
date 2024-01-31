import million from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_POSTS_URL: process.env.NEXT_PUBLIC_POSTS_URL,
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
};

const millionConfig = {
  auto: true, // if you're using RSC: auto: { rsc: true },
};

export default million.next(nextConfig, millionConfig);
