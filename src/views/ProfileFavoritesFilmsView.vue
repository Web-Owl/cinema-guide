<script lang="ts" setup>
import TheHeader from '@/components/global/TheHeader.vue'
import TheFooter from '@/components/global/TheFooter.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'
import { onMounted, ref } from 'vue'
import MovieCard from '@/components/films/MovieCard.vue'
import axiosInstance from '@/axios'
import { useRouter } from 'vue-router'
import useWindowSize from '@/composables/useWindowSize'

const { windowSize } = useWindowSize()
const { isAuthenticated } = storeToRefs(useAuthStore())
const { setFavoritesMovies } = useFavoritesStore()
const { favoritesMovies } = storeToRefs(useFavoritesStore())
const router = useRouter()
const isSettingsActive = ref(false)

function goToProfileSettings() {
  isSettingsActive.value = true
  router.push('/profile')
}

// Функция для удаления фильма из избранного
async function removeFavorite(movieId: number) {
  try {
    // Запрос на удаление фильма из избранного через API
    await axiosInstance.delete(`/favorites/${movieId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })

    // Обновить список избранных фильмов после удаления
    await setFavoritesMovies()
  } catch (error) {
    console.error('Ошибка при удалении из избранного:', error)
  }
}

onMounted(async () => {
  await setFavoritesMovies()
})
</script>

<template>
  <TheHeader class="header-profile" />
  <section class="profile-favorites-films" v-if="isAuthenticated">
    <div class="container">
      <h2 class="profile-favorites-films__title">Мой аккаунт</h2>
      <div class="profile-favorites-films__menu">
        <button
          class="profile-favorites-films__menu-favorites"
          @click="setFavoritesMovies"
        >
          <span class="menu-icon">
            <svg
              class="favorites-icon-favorite"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use xlink:href="/public/sprite.svg#favorite"></use>
            </svg>
          </span>
          <span class="button-text">
            <template v-if="windowSize.x < 768">Избранное</template>
            <template v-else-if="windowSize.x >= 768"
              >Избранные фильмы</template
            >
          </span>
        </button>
        <button
          class="profile-favorites-films__menu-settings"
          :class="{ active: isSettingsActive }"
          @click="goToProfileSettings"
        >
          <span class="menu-icon">
            <svg
              class="favorites-icon-settings"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use xlink:href="/public/sprite.svg#profile-icon"></use>
            </svg>
          </span>
          <span class="button-text">
            <template v-if="windowSize.x < 768">Настройки</template>
            <template v-else-if="windowSize.x >= 768"
              >Настройка аккаунта</template
            >
          </span>
        </button>
      </div>
      <ul class="profile-favorites-films__list">
        <li
          v-for="favorites in favoritesMovies"
          :key="favorites.id"
          class="film-card-item"
        >
          <button
            class="film-card-item__btn-close"
            @click="removeFavorite(favorites.id)"
          >
            <svg class="close-icon" width="24" height="24" aria-hidden="true">
              <use xlink:href="/public/sprite.svg#close-icon"></use>
            </svg>
          </button>
          <MovieCard :movie="favorites" :card-size="String" />
        </li>
      </ul>
    </div>
  </section>
  <TheFooter class="footer-profile-favorites" />
</template>

<style lang="scss" scoped>
.header-profile {
  margin: 0 0 64px;

  @include vp-767 {
    margin: 0 0 24px;
  }
}

.profile-favorites-films {
  &__title {
    color: $color-white;
    font-weight: 700;
    font-size: 48px;
    line-height: 56px;
    margin: 0 0 64px;

    @include vp-767 {
      font-size: 24px;
      line-height: 32px;
      margin: 0 0 40px;
    }
  }

  &__menu {
    display: flex;
    gap: 64px;
    align-items: center;
    margin: 0 0 64px;

    @include vp-767 {
      margin: 0;
      gap: 24px;
      z-index: 72;
      position: absolute;
    }
  }

  &__menu-favorites,
  &__menu-settings {
    display: flex;
    gap: 8px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    color: $color-white;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    padding: 8px 0;
    align-items: center;
  }

  &__menu-favorites {
    border-bottom: 1px solid $color-heliotrope;
  }

  &__list {
    margin: 0 0 70px;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 64px 40px;
    width: 1290px;

    @include vp-767 {
      flex-wrap: nowrap;
      overflow-x: auto;
      width: 375px;
      scrollbar-width: none;
      padding: 100px 20px;
      gap: 0 40px;
      position: absolute;
      top: 150px;
      left: 0;
      z-index: 30;
    }
  }
}

.film-card-item {
  position: relative;
  border: 1px solid transparent;
  border-radius: 16px;

  &__btn-close {
    position: absolute;
    z-index: 1;
    background-color: $color-white;
    border: none;
    padding: 8px;
    width: 40px;
    height: 40px;
    border-radius: 30px;
    cursor: pointer;
    align-items: center;
    top: -20px;
    right: -20px;
    display: none;
  }
}

.close-icon {
  width: 15px;
  height: 15px;
  align-items: center;
  margin: 4px 0;
}

.film-card-item:hover {
  border-color: $color-white;
  @include vp-767 {
    border-color: transparent;
  }
  .film-card-item__btn-close {
    display: block;
    @include vp-767 {
      display: none;
    }
  }
}

.menu-icon {
  width: 24px;
  height: 24px;
  align-items: center;
}

.footer-profile-favorites {
  position: relative;
  z-index: 10;
  background-color: $color-dark-green;
  width: 100%;

  @include vp-767 {
    position: absolute;
    margin-top: 450px;
  }
}

.profile-settings__menu-settings.active {
  border-bottom: 2px solid $color-heliotrope;
}

.profile-favorites-films__menu-favorites.active {
  border-bottom: 2px solid $color-heliotrope;
}
</style>
