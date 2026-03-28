import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Country destinations
      { source: "/destinations/greece", destination: "/greece", permanent: true },
      { source: "/destinations/italy", destination: "/italy", permanent: true },
      { source: "/destinations/cyprus", destination: "/cyprus", permanent: true },
      { source: "/destinations/budapest", destination: "/budapest", permanent: true },
      { source: "/destinations/dubai", destination: "/dubai", permanent: true },
      // City destinations
      { source: "/destinations/athens", destination: "/athens", permanent: true },
      { source: "/destinations/rhodes", destination: "/rhodes", permanent: true },
      { source: "/destinations/santorini", destination: "/santorini", permanent: true },
      { source: "/destinations/crete", destination: "/crete", permanent: true },
      { source: "/destinations/rome", destination: "/rome", permanent: true },
      { source: "/destinations/venice", destination: "/venice", permanent: true },
      { source: "/destinations/florence", destination: "/florence", permanent: true },
      { source: "/destinations/larnaca", destination: "/larnaca", permanent: true },
      { source: "/destinations/paphos", destination: "/paphos", permanent: true },
      // Catch-all for any other destination slugs
      { source: "/destinations/:slug", destination: "/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
