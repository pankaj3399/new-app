// next.config.js
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        ".prisma/client": "commonjs .prisma/client",
        "@prisma/client": "commonjs @prisma/client",
      });
    }

    return config;
  },
};

module.exports = nextConfig;
