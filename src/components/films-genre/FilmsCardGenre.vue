<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  genre: string
}>()

async function goToGenrePage() {
  router.push({ name: 'genre', params: { genre: props.genre } })
}
</script>

<template>
  <article @click="goToGenrePage" class="films-card-genre">
    <div class="films-card-genre__inner">
      <img
        class="films-card-genre__img"
        :src="`/public/images/${genre}.png`"
        alt="изображение фильма"
        width="290"
        height="220"
      />
      <div class="films-card-genre__title">{{ genre }}</div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.films-card-genre {
  display: flex;
  width: 290px;
  flex-direction: column;
  position: relative;
  border-radius: 24px;
  border: 1px solid $color-white-25;
  box-shadow: 0px 0px 80px 0px $color-white-33;
  cursor: pointer;
  overflow: hidden;
  transition: $transition-300;

  @include vp-767 {
    width: 335px;
  }

  &:hover {
    box-shadow: 0px 0px 80px 0px $color-white-50;
  }

  &__img {
    width: 100%;
    height: 220px;
    display: block;
    object-fit: cover;
  }

  &__title {
    width: 100%;
    min-height: 84px;
    background-color: $color-dark-green;
    align-items: center;
    text-align: center;
    padding: 22px 0 30px 0;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: $color-white;
  }

  &__inner {
    width: 100%;
    height: auto;
    overflow: hidden;
  }
}
</style>
