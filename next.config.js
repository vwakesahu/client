/** @type {import('next').NextConfig} */

const API_URL = process.env.API_URL;

module.exports = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "tfhe_bg.wasm": require.resolve("tfhe/tfhe_bg.wasm"),
    };
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};
