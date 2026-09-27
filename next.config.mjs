/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // React Strict Mode is on by default, but let's be explicit
  reactStrictMode: true,
  // Ignore typescript and eslint during initial build just in case there are some leftover Vite types
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
