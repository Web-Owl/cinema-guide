import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:id',
      name: 'movie',
      component: () => import('../views/FilmView.vue'),
    },
    {
      path: '/genres',
      name: 'genres',
      component: () => import('../views/GenreView.vue'),
    },
    {
      path: '/genres/:genre',
      name: 'genre',
      component: () => import('../views/GenreViewFilms.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/ProfileFavoritesFilmsView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileSettingsView.vue'),
    },
  ],
  scrollBehavior() {
    return { left: 0, top: 0, behavior: 'smooth' }
  },
})

export default router
