<script lang="ts" setup>
import type IMovie from '@/types/IMovie'
import { computed } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  movie: IMovie
  cardSize: string
}>()

const { setCurrentMovie } = useMoviesStore()

const movieUrl = computed(() => {
  return props.movie.id
})

function selectFilm() {
  setCurrentMovie(props.movie)
  router.push(`/${movieUrl.value}`)
}
</script>

<template>
  <article
    @click="selectFilm"
    class="films-card"
    :class="cardSize ? `films-card--${cardSize}` : ''"
  >
    <div class="films-card__inner">
      <img
        class="films-card__img"
        :src="movie.posterUrl || '/public/img-no-photo.png'"
        alt="изображение фильма"
        width="224"
        height="336"
      />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.films-card {
  display: flex;
  width: 224px;
  height: 100%;
  flex-direction: column;
  position: relative;
  border-radius: 16px;
  border: 1px solid $color-white-25;
  box-shadow: 0px 0px 80px 0px $color-white-33;
  cursor: pointer;
  overflow: hidden;
  transition: $transition-300;

  @include vp-767 {
    width: 224px;
    height: 336px;
    z-index: 30;
  }

  &:hover {
    box-shadow: 0px 0px 80px 0px $color-white-50;
  }

  &__img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;

    @include vp-767 {
      width: 224px;
      height: 336px;
      z-index: 30;
    }
  }

  &__inner {
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
    overflow: hidden;

    @include vp-767 {
      width: 224px;
      height: 336px;
    }
  }
}

.films-card--small {
  @include vp-767 {
    width: 335px;
    height: 502px;
  }

  .films-card__inner {
    @include vp-767 {
      width: 335px;
      height: 502px;
    }

    .films-card__img {
      @include vp-767 {
        width: 335px;
        height: 502px;
        object-fit: cover;
      }
    }
  }
}
</style>
