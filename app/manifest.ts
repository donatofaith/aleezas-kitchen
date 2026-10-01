import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aleeza's Kitchen",
    short_name: "Aleeza's",
    description:
      "Meals made with love by Chef Aleeza in Ibadan — freshly prepared meals, preorders, takeaway, delivery and cooking classes.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff7f0",
    theme_color: "#d90909",
    icons: [
      {
        src: "/images/brand/aleeza-logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
