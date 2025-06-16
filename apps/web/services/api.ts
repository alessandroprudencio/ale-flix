export default {
  async request(endpoint: string, options: any = {}) {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    try {
      const response = await $fetch(`${baseURL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include',
      })

      return response
    } catch (error) {
      console.error(`API Error: ${endpoint}`, error)
      throw error
    }
  },

  async login(credentials: BodyLogin): Promise<AuthResponse> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }) as Promise<AuthResponse>
  },

  async signup(credentials: BodySignup): Promise<AuthResponse> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }) as Promise<AuthResponse>
  },

  async getPopularMedia() {
    return this.request('/media/popular')
  },

  async getUserProfile() {
    return this.request('/auth/me')
  }
}