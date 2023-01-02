<template>
  <menu
    class="flex rounded-full px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 backdrop-blur bg-white/90 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 ring-1 ring-zinc-900/5 dark:ring-white/10">

    <NavLink v-for="link in links" :current="current" :link="link" />

  </menu>
</template>

<script lang="ts" setup>
import NavLink from "./NavLink.vue";

const props = defineProps<{
  current: string
}>()

const links = [{
  text: "About",
  path: "/",
},
{
  text: "Writing",
  path: "/blog",
},
{
  text: "Projects",
  path: "/projects",
}]
</script>
