<script lang="ts" setup>
import type IMovie from '@/types/IMovie'
import MovieCard from './MovieCard.vue'

defineProps<{
  movie: IMovie
  index: number
  isNumbered: boolean
  cardSize: string
}>()
</script>

<template>
  <li class="films-list-item">
    <span v-if="isNumbered" class="films-card__counter">{{ index + 1 }}</span>
    <MovieCard :movie="movie" :cardSize="cardSize" />
  </li>
</template>

<style lang="scss" scoped>
.films-list-item {
  position: relative;
}

.films-card__counter {
  position: absolute;
  left: -12px;
  top: -12px;
  width: 62px;
  height: 48px;
  background-color: $color-white;
  border-radius: 50px;
  padding: 8px;
  align-items: center;
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: $color-slate-blue;
  z-index: 2;
  pointer-events: none;

  @include vp-767 {
    z-index: 32;
  }
}
</style>
