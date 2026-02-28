import type { NextConfig } from "next";
import NextFederationPlugin from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "remote2",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./DashboardApp": "./src/components/DashboardApp",
        },
        shared: {
          react: { singleton: true, requiredVersion: "^18.0.0" },
          "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
        },
        extraOptions: {},
      })

    );
    return config;
  },
};

export default nextConfig;