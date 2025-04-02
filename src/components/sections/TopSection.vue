<script lang="ts" setup>
import type IMovie from '@/types/IMovie'
import MoviesList from '../films/MoviesList.vue'

defineProps<{
  movies: Array<IMovie>
}>()
</script>

<template>
  <section class="top-block">
    <div class="container container--mobile">
      <h2 class="top-block__title">Топ 10 фильмов</h2>
      <div class="catalog-films">
        <MoviesList :isNumbered="true" :movies="movies" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.container--mobile {
  @include vp-767 {
    padding: 0;
  }
}

.top-block {
  height: 1008px;
  margin: 0 0 -42px;

  @include vp-767 {
    height: 472px;
  }

  &__title {
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    color: $color-white;
    margin: 0 0 64px;

    @include vp-767 {
      padding: 0 20px;
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
      margin: 0 0 40px;
    }
  }
}
</style>
