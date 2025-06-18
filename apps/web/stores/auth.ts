import { defineStore } from 'pinia'
import type { User } from '~/types/user.interface'
import type { BodyLogin } from '~/types/auth.interface'
import api from '~/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const login = async (credentials: BodyLogin) => {
    try {
      isLoading.value = true
      const response = await api.login(credentials)
      user.value = response.user
      isAuthenticated.value = true
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to login'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      isLoading.value = true
      await api.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      // Limpa estado local imediatamente
      user.value = null
      isAuthenticated.value = false
      isLoading.value = false

      // Redireciona sem esperar pela API
      navigateTo('/login')
    }
  }

  const fetchUser = async () => {
    try {
      isLoading.value = true
      const response = await api.getUserProfile()
      user.value = response
      isAuthenticated.value = true
      return response
    } catch (err) {
      user.value = null
      isAuthenticated.value = false
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    fetchUser,
  }
})
