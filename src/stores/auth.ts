import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/axios'
import { useRouter } from 'vue-router'
import type IUser from '@/types/IUser'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const currentUser: Ref<IUser | null> = ref(null)
  const router = useRouter()
  async function register(payload: object) {
    const response = await axiosInstance.post('/user', payload)
    if (response.status === 200) {
      return true
    } else {
      console.log('Неудалось зарегистрироваться')
      return false
    }
  }

  async function login(payload: object) {
    const response = await axiosInstance.post('/auth/login', payload)
    if (response.status === 200) {
      isAuthenticated.value = true
    } else {
      console.log('Неудалось войти')
    }
  }

  async function logout() {
    const response = await axiosInstance.get('/auth/logout')
    if (response.status === 200) {
      isAuthenticated.value = false
      currentUser.value = null
      router.push('/')
    } else {
      console.log('Неудалось выйти')
    }
  }

  async function setUserInfo() {
    const response = await axiosInstance.get('/profile', {
      withCredentials: true,
    })
    currentUser.value = response.data
  }
  return { isAuthenticated, register, login, setUserInfo, currentUser, logout }
})
