<template>
  <li>
    <a :href="link.path" :class="{ 'text-fuchsia-400': isActive }"
      class="relative block px-3 py-2.5 transition hover:text-fuchsia-400">

      {{ link.text }}

      <span v-if="isActive"
        class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-fuchsia-400/0 via-fuchsia-400/60 to-fuchsia-400/0"></span>
    </a>
  </li>
</template>

<script lang="ts" setup>
const props = defineProps<{
  current: String,
  link: { path: string, text: string },
}>()

const isActive = props.current === props.link.path || props.current.startsWith(props.link.path + "/")
</script>
