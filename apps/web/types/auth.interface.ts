import type { User } from './user.interface'

export interface AuthUser {
  id: string
  email: string
}

export interface AuthResponse {
  accessToken: string
  user: User
}

export interface BodySignup {
  email: string
  password: string
  confirmPassword: string
  name: string
}

export interface BodyLogin {
  email: string
  password: string
}

export interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
}

export interface AuthActions {
  login(credentials: BodyLogin): Promise<AuthResponse>
  logout(): Promise<void>
  // refreshToken(): Promise<AuthResponse>;
  reset(): void
}
