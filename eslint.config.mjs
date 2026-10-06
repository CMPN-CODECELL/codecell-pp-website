import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

// The site's components were written for Vite and are kept as they were, so a few
// rules that only matter for Next-specific patterns are relaxed:
//  - plain <img>: the site is a static export, so next/image can't optimise anyway
//  - plain <a href>: links reload the page on purpose so the logo splash plays
//  - the React-compiler style hook rules flag older (working) animation code
const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-page-custom-font": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
