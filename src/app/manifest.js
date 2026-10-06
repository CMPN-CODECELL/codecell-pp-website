export const dynamic = "force-static";

export default function manifest() {
  return {
    name: "CodeCell++ VESIT",
    short_name: "CodeCell++",
    description:
      "Coding and tech community of the Computer Engineering department at VESIT, Mumbai.",
    start_url: "/",
    display: "standalone",
    background_color: "#040b15",
    theme_color: "#040b15",
    icons: [{ src: "/codecell-logo.webp", sizes: "any", type: "image/webp" }],
  };
}
