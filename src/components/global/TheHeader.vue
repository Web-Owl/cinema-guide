<script lang="ts" setup>
import BaseLogo from '@/components/base/BaseLogo.vue'
import BaseRating from '../base/BaseRating.vue'
import { HEADER_MENU } from '@/constants/menu'
import AuthLogin from '../auth/AuthLogin.vue'
import { ref, type Ref, watch } from 'vue'
import BaseModal from '../base/BaseModal.vue'
import BaseBackdrop from '../base/BaseBackdrop.vue'
import RegisterForm from '../auth/RegisterForm.vue'
import CompletedRegister from '../auth/СompletedRegister.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useMoviesStore } from '@/stores/movies'
import type IMovie from '@/types/IMovie'
import router from '@/router'
import useWindowSize from '@/composables/useWindowSize'
import SearchMovies from '../search/SearchMovies.vue'
import SearchMoviesMobile from '../search/SearchMoviesMobile.vue'

const { windowSize } = useWindowSize()
const { isAuthenticated, currentUser } = storeToRefs(useAuthStore())
const { searchMoviesByName, getMovieById, setCurrentMovie } = useMoviesStore()
const isLoginModalOpen = ref(false)
const isCompletedRegisterModalOpen = ref(false)
const searchText = ref('')
const moviesByQuery: Ref<Array<IMovie>> = ref([])
const formType: Ref<string | null> = ref('AuthLogin')

const handleLoginClick = () => {
  isLoginModalOpen.value = true
}

async function goToMoviePage(movie: IMovie) {
  const movieSearch = await getMovieById(movie.id)
  setCurrentMovie(movie)
  router.push({ name: 'movie', params: { id: movieSearch.id } })
}

function convertMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours} ч ${remainingMinutes} мин`
}

function changeFormType() {
  if (formType.value === 'AuthLogin') {
    formType.value = 'RegisterForm'
  } else {
    formType.value = 'AuthLogin'
  }
}

function handleSuccessRegister() {
  formType.value = null
  isCompletedRegisterModalOpen.value = true
  isLoginModalOpen.value = false
}

function backToLoginForm() {
  isCompletedRegisterModalOpen.value = false
  formType.value = 'AuthLogin'
  isLoginModalOpen.value = true
}

function handleLoginUser() {
  isLoginModalOpen.value = false
}

function getColor(movie: IMovie) {
  if (movie.tmdbRating <= 4.9) {
    return 'red'
  } else if (movie.tmdbRating <= 6.9) {
    return 'grey'
  } else if (movie.tmdbRating <= 7.9) {
    return 'green'
  } else {
    return 'yellow'
  }
}

watch(
  () => searchText.value,
  async newValue => {
    moviesByQuery.value = await searchMoviesByName(newValue)
  },
)

const isSearchInputMobileVisible = ref(false)

function showSearchInputMobile() {
  isSearchInputMobileVisible.value = true
}
function closeSearchInputMobile() {
  isSearchInputMobileVisible.value = false
  searchText.value = ''
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <RouterLink
          :class="
            isSearchInputMobileVisible ? 'header-content__logo--opacity' : ''
          "
          class="header-content__logo"
          to="/"
          aria-label="Ссылка на главную страницу"
        >
          <BaseLogo class="base-logo" />
        </RouterLink>
        <nav class="main-nav">
          <ul class="main-nav__list">
            <li
              v-for="menu_item in HEADER_MENU"
              :key="menu_item.id"
              class="main-nav__item"
            >
              <RouterLink class="main-nav__link" :to="menu_item.path">
                <template v-if="windowSize.x < 768 && menu_item.isMobileShow">
                  <BaseIcon :icon="menu_item.iconName" />
                </template>
                <template v-else-if="windowSize.x >= 768">
                  {{ menu_item.name }}
                </template>
              </RouterLink>
            </li>
          </ul>
        </nav>
        <div class="search-block">
          <BaseIcon
            class="search-mobile"
            :width="'24'"
            :height="'24'"
            @click="showSearchInputMobile"
            :icon="'search-mobile'"
          />
          <template v-if="windowSize.x < 768 && isSearchInputMobileVisible">
            <SearchMoviesMobile
              @closeInput="closeSearchInputMobile"
              v-model="searchText"
            />
          </template>
          <template v-else-if="windowSize.x >= 768">
            <SearchMovies v-model="searchText" />
          </template>

          <Transition appear name="fade">
            <div v-if="searchText.length" class="search-block__modal-results">
              <ul
                v-if="searchText.length && moviesByQuery.length"
                class="search-block__films-results"
              >
                <li
                  @click="goToMoviePage(movie)"
                  v-for="movie in moviesByQuery"
                  :key="movie.id"
                  class="search-block__film-result"
                >
                  <img
                    class="film-result__img"
                    :src="movie.posterUrl"
                    alt="Изображение фильма"
                    width="40"
                    height="52"
                  />
                  <div class="search-block__inner">
                    <div class="search-block__info-top">
                      <BaseRating class="film-rating" :color="getColor(movie)">
                        <span class="film-rating__number">{{
                          movie.tmdbRating.toFixed(1)
                        }}</span>
                      </BaseRating>
                      <span class="film-year">{{ movie.releaseYear }}</span>
                      <span class="film-genre">{{ movie.genres[0] }}</span>
                      <span class="film-time">{{
                        convertMinutes(movie.runtime)
                      }}</span>
                    </div>
                    <p class="search-block__title">
                      {{ movie.title }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </Transition>
        </div>
        <button
          v-if="!isAuthenticated && windowSize.x < 768"
          class="header-content__btn-login"
          @click="handleLoginClick"
        >
          <svg width="24" height="24" aria-hidden="true">
            <use xlink:href="/public/sprite.svg#profile-mobile"></use>
          </svg>
        </button>
        <button
          v-if="!isAuthenticated && windowSize.x > 768"
          class="header-content__btn-login"
          @click="handleLoginClick"
        >
          Войти
        </button>
        <RouterLink to="/favorites" class="user-link-profile" v-else>
          <template v-if="windowSize.x < 768 && isAuthenticated">
            <svg
              class="profile-mobile-icon"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use xlink:href="/public/sprite.svg#profile-mobile"></use>
            </svg>
          </template>
          <template v-else-if="windowSize.x >= 768">
            {{ currentUser?.name }}
          </template>
        </RouterLink>
      </div>
    </div>
    <Teleport to="body">
      <Transition name="fade">
        <BaseBackdrop
          v-if="
            isLoginModalOpen ||
            isCompletedRegisterModalOpen ||
            (windowSize.x < 768 && isSearchInputMobileVisible)
          "
        />
      </Transition>
      <Transition name="fade">
        <BaseModal v-if="isLoginModalOpen" @close="isLoginModalOpen = false">
          <template #body>
            <KeepAlive>
              <AuthLogin
                v-if="formType === 'AuthLogin'"
                @success="handleLoginUser"
                @changeForm="changeFormType"
              ></AuthLogin>
              <RegisterForm
                v-else-if="formType === 'RegisterForm'"
                @changeForm="changeFormType"
                @success="handleSuccessRegister"
              ></RegisterForm>
            </KeepAlive>
          </template>
        </BaseModal>
      </Transition>
      <Transition name="fade">
        <BaseModal
          v-if="isCompletedRegisterModalOpen"
          @close="isCompletedRegisterModalOpen = false"
        >
          <template #body
            ><CompletedRegister @backToLogin="backToLoginForm"
          /></template>
        </BaseModal>
      </Transition>
    </Teleport>
  </header>
</template>

<style lang="scss" scoped>
.reset-search-text {
  cursor: pointer;
}

.search-mobile {
  display: none;

  @include vp-767 {
    display: block;
  }
}

.header {
  padding: 24px 0;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: relative;
  background-color: $color-black-50;
  z-index: 20;

  @include vp-767 {
    padding: 16px 0;
    z-index: 200;
  }
}

.header-content {
  display: grid;
  grid-template-columns: min-content min-content 1fr min-content;
  z-index: 10;
  position: relative;

  @include vp-767 {
    display: flex;
  }

  &__logo {
    margin-right: 80px;

    @include vp-767 {
      margin-right: 68px;
      height: 24px;
    }
  }

  &__btn-login {
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    margin: 0;
    border: none;
    color: $color-white;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
  }
}

.main-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @include vp-767 {
    width: 24px;
    margin-right: 40px;
  }

  &__list {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    gap: 40px;
    list-style: none;
    margin-right: 40px;

    @include vp-767 {
      gap: 20px;
    }
  }

  &__link {
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    color: $color-white;
    padding: 8px 0;

    &.router-link-active {
      border-bottom: 1.5px solid $color-heliotrope;

      @include vp-767 {
        border-bottom: none;
        line-height: 20px;
      }
    }
  }
}

.header-content__logo {
  a {
    height: 100%;
    display: flex;
    align-items: center;

    @include vp-767 {
      width: 135px;
      height: 23px;
    }
  }
  &--opacity {
    opacity: 0;
  }
}

.film-rating {
  width: 47px;
  height: 20px;
  padding: 5px 8px;
  border-radius: 16px;

  &__number {
    font-weight: 700;
    font-size: 12px;
    line-height: 30px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.user-link-profile {
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
  border: none;
  color: $color-white;
  font-weight: 400;
  font-size: 24px;
  line-height: 44px;
  border-bottom: 1.5px solid $color-heliotrope;

  @include vp-767 {
    border-bottom: none;
    line-height: 20px;
  }
}

/* SEARCH */

.search-block {
  margin-right: 80px;
  position: relative;

  @include vp-767 {
    margin-right: 20px;
    position: static;
  }

  &__modal-results {
    position: absolute;
    width: 100%;
    background-color: $color-montana;
    top: 72px;
    z-index: 133;
    border-radius: 0 0 8px 8px;

    @include vp-767 {
      left: 0;
      right: 0;
      overflow: hidden;
      top: 47px;
      border-radius: 8px 8px 8px 8px;
      height: 378px;
    }
  }

  &__films-results {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin: 0;
    list-style: none;
    padding: 8px 8px;

    @include vp-767 {
      flex-direction: row;
      overflow-x: scroll;
      scrollbar-width: none;
    }
  }

  &__film-result {
    display: flex;
    gap: 16px;
    margin: 0;
    padding: 20px 8px;
    border: 1px solid transparent;
    border-radius: 6px;
    &:hover {
      border-color: $color-white-50;

      @include vp-767 {
        border: none;
      }
    }

    @include vp-767 {
      flex-direction: column;
      padding: 10px 8px;
      min-width: 220px;
      gap: 8px;
    }
  }

  &__film-result:hover {
    border-color: $color-white-50;
    cursor: pointer;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__info-top {
    display: flex;
    gap: 12px;
    align-items: center;
    color: $color-white-70;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    pointer-events: none;

    @include vp-767 {
      flex-wrap: wrap;
    }
  }

  &__title {
    margin: 0;
    color: $color-white;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    pointer-events: none;
  }
}

.film-result__img {
  @include vp-767 {
    width: 158px;
    height: 206px;
    margin-bottom: 8px;
  }
}
</style>
