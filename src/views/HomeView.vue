<script lang="ts" setup>
import { useMoviesStore } from '@/stores/movies'
import { storeToRefs } from 'pinia'
import TheHeader from '@/components/global/TheHeader.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import TopSection from '@/components/sections/TopSection.vue'
import TheFooter from '@/components/global/TheFooter.vue'
import { onMounted, onUnmounted } from 'vue'

const { getTopMovies, getRandomMovie, resetRandomMovie } = useMoviesStore()
const { topFilms, randomMovie } = storeToRefs(useMoviesStore())

onMounted(async () => {
  await Promise.all([getTopMovies(), getRandomMovie()])
})

onUnmounted(() => {
  resetRandomMovie()
})

async function handleUpdateRandomMovie() {
  await getRandomMovie()
}
</script>

<template>
  <TheHeader />
  <HeroSection
    @updateMovie="handleUpdateRandomMovie"
    :is-buttons-actions-show="true"
    :movie="randomMovie"
    v-if="randomMovie"
  />
  <TopSection :movies="topFilms" v-if="topFilms" />
  <TheFooter />
</template>

<style lang="scss" scoped></style>
