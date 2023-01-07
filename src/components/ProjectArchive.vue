<template>
  <section class="mt-16 sm:mt-20 w-full">

    <a v-for="project in projects" :href="'http://' + project.url" target="_blank" rel="noopener noreferrer"
      class="max-w-sm flex flex-col gap-4 rounded-md transition hover:sm:ring-[14px] hover:sm:ring-offset-[14px] hover:sm:ring-offset-transparent hover:sm:bg-zinc-100 hover:sm:ring-zinc-100 hover:sm:dark:bg-zinc-800/50 hover:sm:dark:ring-zinc-800/50">

      <div
        class="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">

        <img :src="project.src" :alt="project.title" height="220" width="220" class="h-8 w-8" />
      </div>

      <h2 class="font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
        {{ project.title }}
      </h2>

      <p class="text-sm text-zinc-600 dark:text-zinc-400">
        {{ project.description }}
      </p>

      <span
        class="mt-2 text-sm text-fuchsia-600 hover:text-fuchsia-400 dark:text-fuchsia-500 dark:hover:text-fuchsia-400">

        <LinkIcon class="inline-block h-4 w-4 mr-1" />

        {{ project.url }}
      </span>
    </a>

  </section>
</template>

<script lang="ts" setup>
import { LinkIcon } from "@heroicons/vue/24/solid/index.js";

const props = defineProps<{
  projects: {
    url?: string, title?: string, description?: string, src?: string
  }[]
}>()
</script>
