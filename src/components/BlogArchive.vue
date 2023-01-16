<template>
  <section class="mt-16 sm:mt-20 max-w-3xl">

    <article v-for="post in posts"
      class="flex flex-col lg:flex-row items-baseline pb-14 lg:border-l lg:dark:border-zinc-700 lg:border-zinc-200">
      <time :datetime="pubDateTime(post)"
        class="mb-3 lg:w-1/3 text-sm text-zinc-500 dark:text-zinc-400/80 lg:border-0 border-l dark:border-zinc-700 border-zinc-200 pl-3 lg:pl-6">
        {{ post.frontmatter?.pubDate }}
    
        <span v-if="isDraft(post)"
          class="ml-1 inline-flex items-center rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
          Draft
        </span>
      </time>

      <a :href="post.url"
        class="flex-1 rounded-md transition hover:lg:ring-[14px] hover:lg:ring-offset-[14px] hover:lg:ring-offset-transparent hover:lg:bg-zinc-100 hover:lg:ring-zinc-100 hover:lg:dark:bg-zinc-800/50 hover:lg:dark:ring-zinc-800/50">

        <h2 class="font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          {{ post.frontmatter?.title }}
        </h2>

        <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {{ post.frontmatter?.description }}
        </p>

        <span
          class="block mt-2 text-sm text-fuchsia-600 hover:text-fuchsia-400 dark:text-fuchsia-500 dark:hover:text-fuchsia-400">
          Read post &rarr;
        </span>
      </a>
    </article>

  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  posts: { url?: string, frontmatter?: { title?: string, description?: string, pubDate?: Date } }[]
}>()

function pubDateTime(post: any) {
  return new Date(post.frontmatter?.pubDate).toISOString()
}

function isDraft(post: any) {
  return Boolean(post.frontmatter?.draft)
}
</script>
