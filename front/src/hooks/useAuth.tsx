import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth } from "@/lib/auth";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  // ✅ HOOKS SOMENTE AQUI DENTRO

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  useEffect(() => {

    setIsAuthenticated(
      auth.isAuthenticated()
    );

  }, []);

  function login(token: string) {

    auth.setToken(token);

    setIsAuthenticated(true);
  }

  function logout() {

    auth.removeToken();

    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  const context = useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth deve estar dentro do AuthProvider"
    );
  }

  return context;
}