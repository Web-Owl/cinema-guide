<script lang="ts" setup>
import TheHeader from '@/components/global/TheHeader.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import TheFooter from '@/components/global/TheFooter.vue'
import { useMoviesStore } from '@/stores/movies'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const { currentMovie } = storeToRefs(useMoviesStore())
const { getMovieById, setCurrentMovie } = useMoviesStore()
const route = useRoute()

const infoArr = computed(() => [
  {
    title: 'Язык оригинала',
    value: currentMovie.value?.language,
    id: 1,
  },
  {
    title: 'Бюджет',
    value: currentMovie.value?.budget,
    id: 2,
  },
  {
    title: 'Выручка',
    value: currentMovie.value?.revenue,
    id: 3,
  },
  {
    title: 'Режиссёр',
    value: currentMovie.value?.director,
    id: 4,
  },
  {
    title: 'Продакшен',
    value: currentMovie.value?.production,
    id: 5,
  },
  {
    title: 'Награды',
    value: currentMovie.value?.awardsSummary,
    id: 6,
  },
])

onMounted(async () => {
  if (!currentMovie.value) {
    const movie = await getMovieById(+route.params.id)
    setCurrentMovie(movie)
  }
})
</script>

<template>
  <TheHeader />
  <HeroSection
    v-if="currentMovie"
    class="hero-section-film-view"
    :is-buttons-actions-show="false"
    :movie="currentMovie"
    additionalBtnTrailerClass="btn-trailer-mobile"
  />
  <section class="about-film">
    <div class="container">
      <div class="about-film__description">
        <h2 class="about-film__description-title">О фильме</h2>
        <dl class="basic-list">
          <div
            v-for="item in infoArr"
            :key="item.id"
            class="basic-list__item characteristic text_h4"
          >
            <dt class="characteristic__name">
              <div class="">{{ item.title }}</div>
            </dt>
            <dd class="characteristic__value">
              {{ item.value }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
  <TheFooter />
</template>

<style lang="scss" scoped>
.hero-section-film-view {
  @include vp-767 {
    height: 564px;
  }
}

.about-film {
  margin: 0 0 118px;

  @include vp-767 {
    margin: 0 0 32px;
  }

  &__description-title {
    color: $color-white;
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    margin: 0 0 64px;

    @include vp-767 {
      font-size: 24px;
      line-height: 32px;
      margin: 0 0 40px;
    }
  }
}

.characteristic {
  position: relative;
  display: flex;
  justify-content: space-between;

  &::after {
    position: absolute;
    top: 15px;
    width: 100%;
    content: '';
    border-bottom: 1px dashed $color-white;

    @include vp-767 {
      position: static;
      top: 0;
      width: 0;
      border-bottom: none;
    }
  }

  &__name {
    max-width: 50%;
    color: $color-white;
    word-wrap: break-word;
    background-color: $color-dark-green;
    letter-spacing: 1px;

    @include vp-767 {
      margin: 0 0 4px;
      word-wrap: unset;
      letter-spacing: 0;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: $color-white-50;
    }

    div {
      position: relative;
      z-index: 2;
      display: inline;
      padding: 0;
      background-color: $color-dark-green;
    }
  }

  &__value {
    position: relative;
    z-index: 2;
    flex: 0 0 34%;
    margin-left: 30px;
    background-color: $color-dark-green;
    letter-spacing: 1px;

    @include vp-767 {
      position: static;
      flex: none;
      margin-left: 0;
      letter-spacing: 0;
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      color: $color-white;
    }
  }
}

.basic-list {
  display: grid;
  grid-template-columns: minmax(200px, 500px);
  gap: 24px;

  @include vp-767 {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &_additional {
    margin-top: 8px;
  }
}

.accordion-btn {
  display: flex;
  gap: 4px;
  align-items: center;
  margin-top: 8px;
  transition: color;
}

.basic-list__item {
  @include vp-767 {
    display: flex;
    flex-direction: column;
  }
}
</style>
