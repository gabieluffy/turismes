import { Usuario } from "@/hooks/useAuth";
const TOKEN_KEY = "token";
const INFO_USER = "user_id"

function isBrowser() {
  return typeof window !== "undefined";
}

export const auth = {

  getToken() {

    if (!isBrowser()) {
      return null;
    }

    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string) {

    if (!isBrowser()) {
      return;
    }

    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken() {

    if (!isBrowser()) {
      return;
    }

    localStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated() {

    if (!isBrowser()) {
      return false;
    }

    return !!localStorage.getItem(TOKEN_KEY);
  },

  setInfoUser(usuario: Usuario) {
    localStorage.setItem(
      INFO_USER,
      JSON.stringify(usuario)
    );
  },
    
  getInfoUser(): Usuario | null {

    const value = localStorage.getItem(INFO_USER);

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  }
};