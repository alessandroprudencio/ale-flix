interface AuthUser {
  id: string
  email: string
}

interface AuthResponse {
  accessToken: string
  user: AuthUser
}

interface BodySignup {
  email: string
  password: string
  confirmPassword: string
  name: string
}

interface BodyLogin {
  email: string
  password: string
}