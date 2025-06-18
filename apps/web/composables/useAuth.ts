import { useAuthStore } from '~/stores/auth'

export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  return {
    user: computed(() => authStore.user),
    loading: computed(() => authStore.isLoading),
    error: computed(() => authStore.error),
    isAuthenticated: computed(() => authStore.isAuthenticated),

    login: authStore.login,
    logout: authStore.logout,

    async checkAuth() {
      try {
        await authStore.fetchUser()
        return true
      } catch (error) {
        return false
      }
    },
  }
}
