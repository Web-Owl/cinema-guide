<script lang="ts" setup>
import TheHeader from '@/components/global/TheHeader.vue'
import FilmsListGenre from '@/components/films-genre/FilmsListGenre.vue'
import TheFooter from '@/components/global/TheFooter.vue'
import { useMoviesStore } from '@/stores/movies'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const { setGenreMovies } = useMoviesStore()
const { genreMovies } = storeToRefs(useMoviesStore())

onMounted(async () => {
  await setGenreMovies()
})
</script>

<template>
  <TheHeader class="header-genre" />
  <section class="top-block-genre">
    <div class="container">
      <h2 class="top-block-genre__title">Жанры фильмов</h2>
      <div class="catalog-films-genre">
        <FilmsListGenre :genres="genreMovies" />
      </div>
    </div>
  </section>
  <TheFooter />
</template>

<style lang="scss" scoped>
.header-genre {
  margin: 0 0 63px;

  @include vp-767 {
    margin: 0 0 16px;
  }
}

.top-block-genre {
  margin: 0;

  &__title {
    font-weight: 700;
    font-size: 48px;
    line-height: 56px;
    color: $color-white;
    margin: 0 0 64px;

    @include vp-767 {
      font-size: 24px;
      line-height: 32px;
      margin: 0 0 40px;
    }
  }
}
</style>
