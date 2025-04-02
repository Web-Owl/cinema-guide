<script lang="ts" setup>
import type IMovie from '@/types/IMovie'
import MoviesListItem from './MoviesListItem.vue'

interface Props {
  movies: Array<IMovie>
  isNumbered: boolean
  cardSize?: string
}

withDefaults(defineProps<Props>(), {
  cardSize: '',
})
</script>

<template>
  <ul class="films-list" v-if="movies.length">
    <MoviesListItem
      v-for="(movie, index) in movies"
      :cardSize="cardSize ? cardSize : ''"
      :isNumbered="isNumbered"
      :key="movie.id"
      :movie="movie"
      :index="index"
    />
  </ul>
</template>

<style lang="scss" scoped>
.films-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 64px 40px;
  width: 1280px;

  @include vp-767 {
    flex-wrap: nowrap;
    overflow-x: auto;
    width: 375px;
    scrollbar-width: none;
    padding: 100px 20px;
    gap: 0 40px;
    position: absolute;
    top: 697px;
    left: 0;
  }
}
</style>
