import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow SVG content served as .jpg placeholders
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Unoptimize local images so SVG placeholders render fine
    unoptimized: true,
  },
};

export default nextConfig;
