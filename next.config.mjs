/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: false },
  experimental: { esmExternals: "loose" }
};
export default nextConfig;
