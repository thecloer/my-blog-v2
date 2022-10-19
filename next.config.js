/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, { defaultLoaders }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [defaultLoaders.babel, { loader: '@svgr/webpack' }],
    });
    return config;
  },
};

module.exports = nextConfig;
