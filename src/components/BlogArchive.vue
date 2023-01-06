<template>
  <section class="mt-16 sm:mt-20 max-w-3xl">

    <article v-for="post in posts" class="flex flex-col lg:flex-row items-baseline">
      <time :datetime="pubDateTime(post)"
        class="mb-3 lg:w-1/3 text-sm text-zinc-400 dark:text-zinc-500 border-l dark:border-zinc-700 border-zinc-200 pl-3 lg:pl-6">
        {{ post.frontmatter.pubDate }}
      </time>

      <a :href="post.url"
        class="flex-1 rounded-md transition hover:lg:ring-[14px] hover:lg:ring-offset-[14px] hover:lg:ring-offset-transparent hover:lg:bg-zinc-100 hover:lg:ring-zinc-100 hover:lg:dark:bg-zinc-800/50 hover:lg:dark:ring-zinc-800/50">

        <h2 class="font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          {{ post.frontmatter.title }}
        </h2>

        <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {{ post.frontmatter.description }}
        </p>

        <span class="block mt-2 text-sm text-fuchsia-500 hover:text-fuchsia-400">
          Read post &rarr;
        </span>
      </a>
    </article>

  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  posts: { url?: string, frontmatter: { title?: string, description?: string, pubDate?: Date } }[]
}>()

function pubDateTime(post: any) {
  return new Date(post.frontmatter.pubDate).toISOString()
}
</script>
