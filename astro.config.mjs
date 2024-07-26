import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://coworkingalmonaster.site/",
  integrations: [mdx(), sitemap(), preact()],
  output: "server",
  adapter: vercel()
});