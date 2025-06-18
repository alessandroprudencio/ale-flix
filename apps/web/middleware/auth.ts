import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async to => {
  const authStore = useAuthStore()

  // Rotas que não requerem autenticação
  const publicRoutes = ['/login', '/signup']
  if (publicRoutes.includes(to.path)) return

  try {
    // Verifica se já temos usuário na store
    if (!authStore.user) {
      await authStore.fetchUser()
    }
  } catch (error) {
    // Se houver erro, faz logout e redireciona
    await authStore.logout()
    return navigateTo('/login')
  }
})
