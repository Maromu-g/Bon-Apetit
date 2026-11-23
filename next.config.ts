import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Oculta el botón "N" de Next en desarrollo (tapaba la barra del pedido). Los errores se siguen mostrando.
  devIndicators: false,
  images: {
    // Next convierte las imágenes a AVIF/WebP automáticamente según el navegador.
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
