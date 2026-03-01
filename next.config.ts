import type { NextConfig } from "next";
import NextFederationPlugin from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack(config, { isServer }) {
    const location = isServer ? "ssr" : "chunks";

    config.plugins.push(
      new NextFederationPlugin({
        name: "remote2",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          host: `host@${process.env.HOST_URL}/_next/static/${location}/remoteEntry.js`,
        },
        exposes: {
          "./DashboardApp": "./src/components/DashboardApp",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
            strictVersion: false,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: false,
            strictVersion: false,
          },
        },
        extraOptions: {},
      })
    );
    return config;
  },
};

export default nextConfig;
