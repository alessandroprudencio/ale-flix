import type { BodyLogin, AuthResponse, BodySignup } from '~/types/auth.interface'

export default {
  async request(endpoint: string, options: any = {}): Promise<any> {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase
    const authStore = useAuthStore()

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    try {
      return await $fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include',
      })
    } catch (error: any) {
      if (error.status === 401) {
        // Limpa estado local imediatamente
        authStore.user = null
        authStore.isAuthenticated = false
      }
      throw error
    }
  },

  async login(credentials: BodyLogin): Promise<AuthResponse> {
    return this.request('/auth/login', {
      method: 'POST',
      body: credentials,
    }) as Promise<AuthResponse>
  },

  async signup(credentials: BodySignup): Promise<AuthResponse> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: credentials,
    }) as Promise<AuthResponse>
  },

  async logout(): Promise<AuthResponse> {
    return this.request('/auth/logout', {
      method: 'POST',
      body: {},
    }) as Promise<AuthResponse>
  },

  // async refreshToken(): Promise<AuthResponse> {
  //   return this.request('/auth/refreshToken', {
  //     method: 'POST',
  //     body: {},
  //   }) as Promise<AuthResponse>
  // },

  async getUserProfile() {
    return this.request('/auth/me')
  },

  async getSeries() {
    return this.request('/media/series')
  },

  async getMovies() {
    return this.request('/media/movies')
  },

  async getCategories() {
    return this.request('/media/categories')
  },

  async getCategoryById(id: string) {
    return this.request(`/media/categories/${id}`)
  },

  async getMediaByCategory(categoryId: string) {
    return this.request(`/media/categories/${categoryId}/media`)
  },

  async createMedia(data: {
    title: string
    description?: string
    thumbnailUrl: string
    poster: string
    releaseYear: number
    type: 'MOVIE' | 'SERIES' | 'DOCUMENTARY'
    rating: 'G' | 'PG' | 'PG13' | 'R' | 'NC17'
    duration: number
    categories: string[]
  }) {
    return this.request('/media', {
      method: 'POST',
      body: data,
    })
  },
}
