// https://astro.build/config

import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [tailwind(), vue(), sitemap()]
});
