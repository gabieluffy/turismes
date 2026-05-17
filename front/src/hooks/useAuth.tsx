import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth } from "@/lib/auth";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (email: string, password: string, username: string) => void;
  get_all_places: PlaceType[];
  busca_places: (token: string) => Promise<void>
};

export interface PlaceType {
  id: string,
  name: string,
  city: string,
  region: string,
  category: string,
  description: string,
  latitude: string,
  longitude: string,
  image_url: string,
  average_rating: string,
  tags: string,
  featured: string
}

const host = import.meta.env.VITE_API_URL;

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
  const [get_all_places, setAll_Places] = useState<PlaceType[]>([])

  useEffect(() => {

    setIsAuthenticated(
      auth.isAuthenticated()
    );

  }, []);

  async function login(email: string, password: string) {
    try {
      
        const response = await fetch(`${host}/login`,{
          method: "POST",
          headers:{ "Content-Type": "application/json" },
          body:JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (!response.ok){
          throw new Error(data.erro);
        }

        auth.setToken(data.token);
  
      setIsAuthenticated(true);

    } catch (error) {
      console.error(error)
      setIsAuthenticated(false)
      throw error;
    }
  }

  async function register(email: string, password: string, username: string) {
    try {
      const response = await fetch(`${host}/register`,{
        method: "POST",
        headers:{ "Content-Type": "application/json" },
        body:JSON.stringify({ email, password, username })
      });
      
      const data = await response.json();
        
      if (!response.ok){
        throw new Error(data.erro);
      }
      
      console.log(" Registrado com sucesso! ")

    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  function logout() {

    auth.removeToken();

    setIsAuthenticated(false);
  }

  async function busca_places(token: string) {

    try {

      const response = await fetch(
        `${host}/todos_pontos_turisticos`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro);
      }

      const places: PlaceType[] = data.map((place: any) => ({
        id: place.id,
        name: place.name,
        city: place.city,
        region: place.region,
        category: place.category,
        description: place.description,
        latitude: place.latitude,
        longitude: place.longitude,
        image_url: place.image_url,
        average_rating: place.average_rating,
        tags: place.tags,
        featured: place.featured,
      }));

      setAll_Places(places);

    } catch (error) {
      console.error(error);
    }
  }

    return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          login,
          logout,
          register,
          get_all_places,
          busca_places
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