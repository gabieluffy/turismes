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
  busca_places: (token: string) => Promise<void>;
  get_all_favorites_places: FavoritePlaceType[];
  buscar_favorites_places: (token: string) => Promise<void>;
  dados: any[];
  grafico: () => Promise<void>
};

export interface PlaceType {
  id: number
  name: string
  city: string
  region: string
  category: string
  description: string
  latitude: number
  longitude: number
  image_url: string
  average_rating: number
  tags: string
  featured: boolean
}

export interface UserType {
  id: number
  username: string
  email: string
  password: string
}

export interface FavoritePlaceType {
  id: number
  place: PlaceType
  user: UserType
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
  const [get_all_favorites_places, setAll_favorites_places] = useState<FavoritePlaceType[]>([])
  const [dados, setDados] = useState<any[]>([]);

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

  async function buscar_favorites_places(token: string){
    try {
      const response = await fetch(
        `${host}/favoritos`,
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
        throw new Error(data.erro)
      }

      setAll_favorites_places(data);

    } catch (error) {
      console.error(error);
    }
  }

  async function grafico() {
    try {
      fetch(`${host}/grafico`)
            .then(res => res.json())
            .then(data => setDados(data));
    } catch (error) {
      console.error(error)
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
          busca_places,
          get_all_favorites_places,
          buscar_favorites_places,
          dados,
          grafico
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