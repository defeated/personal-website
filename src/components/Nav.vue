<template>
  <menu
    class="flex rounded-full px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 backdrop-blur bg-white/90 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 ring-1 ring-zinc-900/5 dark:ring-white/10">

    <li v-for="link in links">
      <a :href="link.path" :class="{ 'text-fuchsia-400': isActive(link) }"
        class="relative block px-3 py-2.5 transition hover:text-fuchsia-400">

        {{ link.text }}

        <span v-if="isActive(link)"
          class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-fuchsia-400/0 via-fuchsia-400/60 to-fuchsia-400/0"></span>
      </a>
    </li>

  </menu>
</template>

<script lang="ts" setup>
const props = defineProps({
  current: String
})

function isActive(link: any) {
  return link.path === props.current
}

const links = [{
  text: "About",
  path: "/",
},
{
  text: "Writing",
  path: "/writing",
},
{
  text: "Projects",
  path: "/projects",
}]
</script>
