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

  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin", // Matched parameters can be used in the value
          },
          {
            key: "Cross-Origin-Embedder-Policy", // Matched parameters can be used in the key
            value: "require-corp",
          },
        ],
      },
    ];
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
