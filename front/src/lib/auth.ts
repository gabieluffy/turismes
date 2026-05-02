const TOKEN_KEY = "token";

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
};