import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "loremflickr.com",
      },
    ],
  },
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true
    return config;
  },
};

export default nextConfig;
