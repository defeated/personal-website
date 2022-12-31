// https://astro.build/config

import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";

export default defineConfig({
  site: "https://eddiecianci.info",
  integrations: [tailwind(), vue(), sitemap(), image()]
});
