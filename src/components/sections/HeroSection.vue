<script lang="ts" setup>
import type IMovie from '@/types/IMovie'
import BaseButton from '../base/BaseButton.vue'
import BaseRating from '../base/BaseRating.vue'
import { ref, computed, onMounted, type Ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMoviesStore } from '@/stores/movies'
import { useFavoritesStore } from '@/stores/favorites'
import axiosInstance from '@/axios'
import { useAuthStore } from '@/stores/auth'
import BaseModal from '../base/BaseModal.vue'
import AuthLogin from '../auth/AuthLogin.vue'
import RegisterForm from '../auth/RegisterForm.vue'
import CompletedRegister from '../auth/СompletedRegister.vue'
import BaseBackdrop from '../base/BaseBackdrop.vue'
import { storeToRefs } from 'pinia'

const router = useRouter()
const { getMovieById, setCurrentMovie } = useMoviesStore()
const { setFavoritesMovieById, setFavoritesMovies } = useFavoritesStore()
const { isAuthenticated } = storeToRefs(useAuthStore())
const { favoritesMovies } = storeToRefs(useFavoritesStore())

const isVideoModalOpen = ref(false)

function openVideoModal() {
  isVideoModalOpen.value = true
}

function closeVideoModal() {
  isVideoModalOpen.value = false
}

const props = defineProps<{
  isButtonsActionsShow: boolean
  movie: IMovie
  additionalBtnTrailerClass?: string
}>()

const isFavorite = ref(false)
const isLoginModalOpen = ref(false)
const isCompletedRegisterModalOpen = ref(false)

const formType: Ref<string | null> = ref('AuthLogin')

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
  // Проверка, является ли текущий фильм избранным
  isFavorite.value = !!favoritesMovies.value.find((movie: { id: number }) => {
    return movie.id === props.movie.id
  })
})

const handleToggleFavorite = async () => {
  if (!isAuthenticated.value) {
    // Если пользователь не авторизован
    isLoginModalOpen.value = true // Открываем модальное окно авторизации
    return // Завершаем выполнение функции
  }
  if (isFavorite.value === false) {
    await setFavoritesMovieById(props.movie.id)
    isFavorite.value = !isFavorite.value
  } else if (isFavorite.value === true) {
    removeFavorite(props.movie.id)
    isFavorite.value = !isFavorite.value
  }
}

function convertMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours} ч ${remainingMinutes} мин`
}

const getColor = computed(() => {
  if (props.movie.tmdbRating <= 4.9) {
    return 'red'
  } else if (props.movie.tmdbRating <= 6.9) {
    return 'grey'
  } else if (props.movie.tmdbRating <= 7.9) {
    return 'green'
  } else {
    return 'yellow'
  }
})

async function goToMoviePage() {
  const movie = await getMovieById(props.movie.id)
  setCurrentMovie(movie)
  router.push({ name: 'movie', params: { id: props.movie.id } })
}

const emit = defineEmits(['updateMovie'])

function updateMovie() {
  emit('updateMovie')
}

watch(
  () => props.movie,
  () => {
    const isLike = favoritesMovies.value?.some((movie: { id: number }) => {
      return movie.id === props.movie.id
    })
    isFavorite.value = isLike ? true : false
  },
)
</script>

<template>
  <section v-if="movie" class="hero-block">
    <div class="container container--mobile">
      <div class="hero-wrapper">
        <div class="container-mobile">
          <img
            class="hero-wrapper__img"
            :src="movie.backdropUrl || '/public/img-no-photo.png'"
            alt="изображение фильма"
            width="900"
            height="680"
          />
        </div>
        <div class="hero-wrapper__info">
          <div class="hero-wrapper__info-top">
            <BaseRating :color="getColor">
              {{ movie.tmdbRating.toFixed(1) }}
            </BaseRating>
            <span class="film-year">{{ movie.releaseYear }}</span>
            <span class="film-genre">{{ movie.genres[0] }}</span>
            <span class="film-time">{{ convertMinutes(movie.runtime) }}</span>
          </div>
          <p class="hero-wrapper__info-title">
            {{ movie.title }}
          </p>
          <p class="hero-wrapper__info-description">
            {{ movie.plot }}
          </p>
          <div class="hero-wrapper__info-bottom">
            <BaseButton
              :class="['btn-trailer', additionalBtnTrailerClass]"
              class="btn-trailer"
              :type="'primary'"
              @click="openVideoModal"
              >Трейлер</BaseButton
            >
            <template v-if="isButtonsActionsShow">
              <BaseButton
                class="btn-film-about"
                :type="'secondary'"
                @click="goToMoviePage"
                >О фильме</BaseButton
              >
            </template>
            <BaseButton
              class="btn-favorite"
              :type="'secondary'"
              @click="handleToggleFavorite"
            >
              <BaseIcon
                class="favorite-svg"
                :width="'24px'"
                :height="'24px'"
                :icon="isFavorite ? 'favorite-on' : 'favorite'"
                v-show="!isFavorite"
              />
              <BaseIcon
                class="favorite-svg-on"
                :width="'24px'"
                :height="'24px'"
                :icon="'favorite-on'"
                v-show="isFavorite"
              />
            </BaseButton>
            <template v-if="isButtonsActionsShow">
              <BaseButton
                @click="updateMovie"
                class="btn-refresh"
                :type="'secondary'"
              >
                <BaseIcon
                  class="refresh-svg"
                  :width="'24px'"
                  :height="'24px'"
                  :icon="'refresh'"
                />
              </BaseButton>
            </template>
          </div>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <Transition name="fade">
        <BaseBackdrop
          v-if="
            isLoginModalOpen || isCompletedRegisterModalOpen || isVideoModalOpen
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
      <Transition name="fade">
        <BaseModal
          :is-video="true"
          v-if="isVideoModalOpen"
          @close="closeVideoModal"
        >
          <template #body>
            <iframe
              width="100%"
              height="100%"
              :src="`https://www.youtube.com/embed/${movie.trailerYouTubeId}`"
              frameborder="0"
              allow="autoplay; encrypted-media"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </template>
        </BaseModal>
      </Transition>
    </Teleport>
  </section>
</template>

<style lang="scss" scoped>
.hero-block {
  height: 470px;
  margin: 0 0 47px;

  @include vp-767 {
    height: 636px;
    display: flex;
    flex-direction: column;
    position: static;
    width: 375px;
    margin: 0 0 25px;
  }
}

.hero-wrapper {
  $root: &;
  position: relative;

  @include vp-767 {
    height: 0;
    display: flex;
    flex-direction: column;
    position: static;
  }

  &__img {
    z-index: 1;
    position: absolute;
    width: 900px;
    height: 680px;
    top: -204px;
    right: -80px;
    object-fit: cover;

    @include vp-767 {
      display: flex;
      width: 100%;
      height: 260px;
      position: static;
    }
  }

  &__info {
    padding: 0;
    position: relative;
    z-index: 11;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 600px;
    margin: 107px 0 0 0;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;

    @include vp-767 {
      padding: 0 20px;
      width: 335px;
      margin: -9px 0;
      position: static;
      overflow: initial;
      padding: 24px 20px;
    }
  }

  &__info-top {
    display: flex;
    gap: 16px;
    color: $color-white-70;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 16px;
    align-items: center;

    @include vp-767 {
      width: 335px;
      margin-bottom: 12px;
      font-size: 14px;
      line-height: 20px;
    }
  }

  &__info-title {
    color: $color-white;
    font-weight: 700;
    font-size: 48px;
    line-height: 56px;
    margin: 0 0 16px;
    padding: 0;

    @include vp-767 {
      width: 335px;
      font-size: 24px;
      line-height: 32px;
      margin: 0 0 12px;
    }
  }

  &__info-description {
    margin: 0 0 60px;
    padding: 0;
    color: $color-white-70;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;

    @include vp-767 {
      width: 335px;
      font-size: 18px;
      line-height: 24px;
      margin: 0 0 32px;
    }
  }

  &__info-bottom {
    display: flex;
    gap: 16px;

    @include vp-767 {
      width: 335px;
      flex-wrap: wrap;
    }
  }
}

.btn-trailer {
  width: 171px;

  @include vp-767 {
    width: 335px;
  }
}

.btn-film-about {
  width: 183px;

  @include vp-767 {
    width: 167px;
  }
}

.btn-favorite,
.btn-refresh {
  width: 68px;
  padding: 0;
  line-height: 0;
}

.btn-favorite {
  position: relative;
}

.favorite-svg,
.btn-refresh {
  color: $color-white;
}

.btn-favorite:hover .favorite-svg {
  color: $color-black;
}

.favorite-svg-on {
  position: absolute;
  left: 22px;
  top: 16px;
}

.container--mobile {
  @include vp-767 {
    padding: 0;
  }
}

.btn-trailer-mobile {
  @include vp-767 {
    width: 251px;
  }
}
</style>
