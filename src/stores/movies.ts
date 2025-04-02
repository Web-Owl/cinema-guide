import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/axios'
import type IMovie from '@/types/IMovie'

export const useMoviesStore = defineStore('movies', () => {
  const topFilms = ref()
  const randomMovie = ref()
  const genreMovies = ref()
  const currentMovie: Ref<IMovie | undefined> = ref()
  const moviesByParams = ref()
  const MOVIES_COUNT_LIMIT = 15
  const MOVIES_COUNT_LIMIT_SEARCH_FILMS = 5
  const moviesPage = ref(1)

  function resetRandomMovie() {
    randomMovie.value = null
  }

  async function getTopMovies() {
    const response = await axiosInstance.get('/movie/top10')
    topFilms.value = response.data
  }
  async function getRandomMovie() {
    const response = await axiosInstance.get('/movie/random')
    randomMovie.value = response.data
  }
  async function setGenreMovies() {
    const response = await axiosInstance.get('/movie/genres')
    genreMovies.value = response.data
  }
  function setCurrentMovie(movie: IMovie) {
    currentMovie.value = movie
  }
  async function getMovieById(id: number) {
    const response = await axiosInstance.get(`/movie/${id}`)
    return response.data
  }
  async function setMovies(genre: string) {
    const response = await axiosInstance.get(
      `/movie/?genre=${genre}&count=${MOVIES_COUNT_LIMIT}&page=${moviesPage.value}`,
    )
    moviesByParams.value = response.data
  }

  async function searchMoviesByName(name: string) {
    const response = await axiosInstance.get(
      `/movie/?title=${name}&count=${MOVIES_COUNT_LIMIT_SEARCH_FILMS}&page=${moviesPage.value}`,
    )
    return response.data
  }

  async function loadMoreMovies(genre: string) {
    const response = await axiosInstance.get(
      `/movie/?genre=${genre}&count=${MOVIES_COUNT_LIMIT}&page=${moviesPage.value}`,
    )
    moviesByParams.value = [...moviesByParams.value, ...response.data]
  }

  function incrementPage() {
    moviesPage.value++
  }

  function resetPage() {
    moviesPage.value = 0
  }

  return {
    getTopMovies,
    topFilms,
    getRandomMovie,
    randomMovie,
    setGenreMovies,
    genreMovies,
    setCurrentMovie,
    currentMovie,
    getMovieById,
    setMovies,
    moviesByParams,
    incrementPage,
    loadMoreMovies,
    resetPage,
    searchMoviesByName,
    resetRandomMovie,
  }
})
