import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function get(context) {
  return rss({

    // `<title>` field in output xml
    title: "Eddie Cianci - Writing about people, process and technology.",

    // `<description>` field in output xml
    description: "Thoughts on a career building software and software teams. From playing senior roles on 'both ends of the horse' (frontend & backend), to mentoring and coaching engineers, to managing a portfolio of products & teams.",

    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,

    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: await pagesGlobToRssItems(import.meta.glob("./blog/*.{md,mdx}"))
  });
}
