<script lang="ts" setup>
import FilmsCardGenre from './FilmsCardGenre.vue'

defineProps<{
  genre: string
}>()
</script>

<template>
  <li class="films-list-item-genre">
    <FilmsCardGenre :genre="genre" />
  </li>
</template>

<style lang="scss" scoped>
.films-list-item-genre {
  position: relative;
}
</style>
