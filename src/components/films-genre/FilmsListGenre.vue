<script lang="ts" setup>
import FilmsListItemGenre from './FilmsListItemGenre.vue'

defineProps<{
  genres: Array<string>
}>()
</script>

<template>
  <ul class="films-list-genre">
    <FilmsListItemGenre v-for="genre in genres" :key="genre" :genre="genre" />
  </ul>
</template>

<style lang="scss" scoped>
.films-list-genre {
  margin: 0 0 160px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 62px 40px;
  width: 1280px;

  @include vp-767 {
    margin: 0 0 40px;
    gap: 22px 0;
    width: 335px;
    flex-direction: column;
  }
}
</style>
