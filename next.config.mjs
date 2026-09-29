/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    NEXT_PUBLIC_LAST_BUILD: new Date().toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })
  },
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
