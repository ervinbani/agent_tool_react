import { api, JWT_TOKEN_KEY } from './api';
import type { LoginRequest, SignupRequest } from '../types/auth';

export const authService = {
  async login(data: LoginRequest): Promise<string> {
    const response = await api.post('/login', data);
    const token = response.data.data.token;
    localStorage.setItem(JWT_TOKEN_KEY, token);
    return token;
  },

  async signup(data: SignupRequest): Promise<string> {
    const response = await api.post('/signup', data);
    return response.data;
  },

  logout(): void {
    localStorage.removeItem(JWT_TOKEN_KEY);
    window.location.href = '/login';
  },

  getToken(): string | null {
    return localStorage.getItem(JWT_TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      // Decodifica JWT per verificare scadenza
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() < exp;
    } catch {
      return false;
    }
  },
};
