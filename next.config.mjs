/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "placehold.co",
      },
      {
        hostname: "**.vercel-storage.com",
      },
      {
        hostname: "avatar.iran.liara.run",
      },
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "loremflickr.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
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
