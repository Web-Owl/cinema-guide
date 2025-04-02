import axiosInstance from '@/axios'
import type IMovie from '@/types/IMovie'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoritesMovies = ref<IMovie[]>([]) // массив избранных фильмов
  const { isAuthenticated } = storeToRefs(useAuthStore())
  // метод для добавления в избранное

  async function setFavoritesMovies() {
    if (!isAuthenticated.value) return
    const response = await axiosInstance.get('/favorites', {
      withCredentials: true,
    })
    favoritesMovies.value = response.data
  }

  async function getFavoritesById(id: number) {
    const response = await axiosInstance.get(`/favorites/${id}`, {
      withCredentials: true,
    })
    return response.data
  }

  async function setFavoritesMovieById(id: number) {
    await axiosInstance.post(
      `/favorites`,
      { id: id.toString() },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    )
    await setFavoritesMovies()
  }

  return {
    favoritesMovies,
    setFavoritesMovies,
    getFavoritesById,
    setFavoritesMovieById,
  }
})
