<script lang="ts" setup>
import TheHeader from '@/components/global/TheHeader.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import TheFooter from '@/components/global/TheFooter.vue'
import MoviesList from '@/components/films/MoviesList.vue'
import { useRoute, useRouter } from 'vue-router'
import { useMoviesStore } from '@/stores/movies'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import BaseIcon from '@/components/base/BaseIcon.vue'

const { setMovies, incrementPage, loadMoreMovies } = useMoviesStore()
const { moviesByParams } = storeToRefs(useMoviesStore())

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  await setMovies(route.params.genre as string)
})

function goBack() {
  router.go(-1)
}

async function loadMore() {
  incrementPage()
  await loadMoreMovies(route.params.genre as string)
}
</script>

<template>
  <TheHeader class="header-genre-films" />
  <section class="top-block-genre-films">
    <div class="container">
      <div class="top-block-genre-films__inner">
        <button class="top-block-genre-films__link-back" @click="goBack">
          <BaseIcon
            class="arrow-back-icon"
            :icon="'arrow-back'"
            width="40px"
            height="40px"
          />
        </button>
        <h2 class="top-block-genre-films__title">{{ route.params.genre }}</h2>
      </div>
      <div class="catalog-films-genre-films">
        <MoviesList
          :cardSize="'small'"
          :isNumbered="false"
          v-if="moviesByParams?.length"
          :movies="moviesByParams"
        />
        <BaseButton @click="loadMore" class="btn-show-more" :type="'primary'"
          >Показать ещё</BaseButton
        >
      </div>
    </div>
  </section>
  <TheFooter />
</template>

<style lang="scss" scoped>
.header-genre-films {
  margin: 0 0 64px;

  @include vp-767 {
    margin: 0 0 15px;
  }
}

.catalog-films-genre-films {
  width: 335px;
}

.top-block-genre-films {
  margin: 0 0 158px;

  @include vp-767 {
    margin: 0 0 40px;
  }

  &__link-back {
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border: none;

    @include vp-767 {
      width: 32px;
      height: 32px;
      padding: 0;
    }
  }

  &__inner {
    display: flex;
    align-items: center;
    margin: 0 0 64px;
    gap: 17px;

    @include vp-767 {
      margin: 0 0 40px;
      gap: 7px;
      width: 335px;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 48px;
    line-height: 56px;
    color: $color-white;
    margin: 0;

    @include vp-767 {
      font-size: 24px;
      line-height: 32px;
    }
  }
}

.films-list {
  margin: 0 0 68px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 64px 40px;
  width: 1280px;

  @include vp-767 {
    gap: 24px 0;
    flex-direction: column;
    align-items: center;
    position: static;
    overflow-x: unset;
    padding: 0;
    width: 335px;
    margin: 0 0 40px;
  }
}

.btn-show-more {
  width: 218px;
  margin: 0 530px;

  @include vp-767 {
    width: 335px;
    margin: 0;
  }
}

.arrow-back-icon {
  @include vp-767 {
    width: 32px;
    height: 32px;
  }
}
</style>
