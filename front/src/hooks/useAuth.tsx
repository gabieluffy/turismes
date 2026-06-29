import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch, 
  SetStateAction
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
  buscar_favorites_places(id_user: number, token: string): Promise<void>
  grafico_fvoritos(): Promise<void>;
  graf_favorites: {categoria: any;favoritos: any;}[];
  graf_local_municipio: {cidade: string;locais: number;}[];
  grafico_local_municipio(): Promise<void>;
  graf_categorias: {categoria: string;quantidade: number;}[]
  grafico_categorias(): Promise<void>;
  carregarDestinos(categoria?: number): Promise<void>;
  destinos: Destino[];
  setCategoriaSelecionada: Dispatch<SetStateAction<number | null>>;
  categoriaSelecionada: number | null;
  adicionarFavorito: (id_user: number, id_place: number ) => Promise<void>;
  removerFavorito: ( id_user: number, id_place: number ) => Promise<void>;
  toggleFavorito( id_place: number, favorito: boolean ): Promise<void>;
  usuario: Usuario | null;
  carregarPerguntas(): Promise<void>;
  perguntas: Pergunta[];
  loading: boolean;
  roteiroCarga(user_id: number): Promise<void>;
  roteiro: Roteiro[];
  historico: QuizHistorico[];
  buscar_historico(id_user: number): Promise<void>;
  resultadoQuiz(id_user: number, resultado: number[]): Promise<void>;
  resultsQuiz: ResultadoQuiz[];
  removerQuizHistorico(id_quiz: string): Promise<void>;
  perfilUsuario: PerfilUsuario | null;
  buscarPerfil(id_user: number): Promise<void>;
  editarPerfil(id_user: number, perfil: PerfilUsuario): Promise<void>;
  esqueciSenha(email: string): Promise<any>;
  validarToken(token: string): Promise<any>;
  redefinirSenha(token: string, novaSenha: string): Promise<any>;
  loading1: boolean;
  erro: string | null;
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

export interface GraficFavorites
  {
      categoria: any;
      favoritos: any;
  }

export interface Usuario {
  id: number,
  email: string,
  username: string
}
  

export interface Destino {
  id: number;
  name: string;
  cidade: string;
  image_url: string;
  categoria: string;
  average_rating: number;
  slug: string;
  description: string;
}

export interface Alternativa {
  id: number,
  texto: string
}

export interface Pergunta {
  id: number,
  titulo: string,
  alternativas: Alternativa[]
}

export interface Roteiro {
  badge: string,
  cat: [
    string
  ],
  desc: string,
  icon: string,
  img: string,
  next: string,
  title: string
}

export interface CategoriaHistorico {
  categoria_id: number;
  categoria_nome: string;
  pontuacao: number;
}

export interface QuizHistorico {
  quiz_id: string;
  data_realizacao: string;
  pontuacao_total: number;
  categorias: CategoriaHistorico[];
}

export interface PerfilUsuario {
  username: string;
  email: string;
  telefone: string;
  cidade: string;
  bio: string;
}

export type ResultadoQuiz = {
    categoria: string;
    id_categoria: number;
    pontos: number;
};
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
  const [graf_favorites, setGraf_favorites] = useState<{categoria: any;favoritos: any;}[]>([])
  const [graf_local_municipio, setGraf_local_municipio] = useState<{cidade: string;locais: number;}[]>([])
  const [graf_categorias, setGraf_categorias] = useState<{categoria: string;quantidade: number;}[]>([])
  const [destinos, setDestinos] = useState<Destino[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [loading, setLoading] = useState(true);
  const [ roteiro, setRoteiro ] = useState<Roteiro[]>([]);
  const [historico, setHistorico] = useState<QuizHistorico[]>([]);
  //const [resultsQuiz, setResultsQuiz] = useState<{ id_user: number, resultado: number[] }>();
  const [resultsQuiz, setResultsQuiz] = useState<ResultadoQuiz[]>([]);
  const [perfilUsuario, setPerfilUsuario] = useState<PerfilUsuario | null>(null);
  const [loading1, setLoading1] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

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
        auth.setInfoUser(data.user)
  
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

  async function buscar_favorites_places(
    id_user: number,
    token: string
  ) {
    try {
      const response = await fetch(
        `${host}/favoritos/${id_user}`,
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

      setAll_favorites_places(data);

    } catch (error) {
      console.error(error);
    }
  }

  async function grafico_fvoritos() {
    try { 
      
      const response = await fetch(
        `${host}/grafico_favoritos_categoria`,
        {method: "GET"}
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro);
      }
      
      const grafic: {categoria: any;favoritos: any;}[] = data.map((i: any) => ({
        categoria: i.categoria,
        favoritos: i.favoritos
      }))

      setGraf_favorites(grafic)

    } catch ( error) {
      console.error( error)
    }
  }

  async function grafico_local_municipio() {
    try {
      
      const response = await fetch(
        `${host}/grafico_municipios`,
        {method: "GET"}
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro);
      }
      
      const grafic: {cidade: string;locais: number;}[] = data.map((i: any) => ({
        cidade: i.cidade,
        locais: i.locais
      }))

      setGraf_local_municipio(grafic)

    } catch ( error) {
      console.error( error)
    }
  }

  async function grafico_categorias() {
    try {
      
      const response = await fetch(
        `${host}/grafico_categorias`,
        {method: "GET"}
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro);
      }
      
      const grafic: {categoria: string;quantidade: number;}[] = data.map((i: any) => ({
        categoria: i.categoria,
        quantidade: i.quantidade
      }))

      setGraf_categorias(grafic)

    } catch ( error) {
      console.error( error)
    }
  }
  
  async function carregarDestinos(categoria?: number) {

    let url = `${host}/destaques`;

    if (categoria) {
      url += `?categoria=${encodeURIComponent(categoria)}`;
    }

    const response = await fetch(url);

    const data = await response.json();

    setDestinos(data);
  }
  async function adicionarFavorito(
    id_user: number,
    id_place: number
  ) {
    try {
      const response = await fetch(
        `${host}/favorito`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_user,
            id_place,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Erro ao favoritar: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Favorito criado:", data);

    } catch (error) {
      console.error(error);
    }
  }
  async function removerFavorito(
    id_user: number,
    id_place: number
  ) {
    try {
      const response = await fetch(
        `${host}/favorito/${id_user}/${id_place}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Erro ao remover favorito: ${response.status}`
        );
      }

      console.log("Favorito removido");
    } catch (error) {
      console.error(error);
    }
  }

  async function toggleFavorito(
    id_place: number,
    favorito: boolean
  ) {

    if (!usuario) return;

    if (favorito) {

      await removerFavorito(
        usuario.id,
        id_place
      );

    } else {

      await adicionarFavorito(
        usuario.id,
        id_place
      );

    }
  }

  async function carregarPerguntas() {
  try {
    const response = await fetch(
      `${host}/quiz/perguntas`
    );

    const data = await response.json();

    setPerguntas(data);
    } catch (error) {
      console.error("Erro ao buscar perguntas", error);
    } finally {
    setLoading(false);
    }
  }

  async function roteiroCarga(user_id: number) {

    //navigator.geolocation.getCurrentPosition(
      //async (position) => {

        try {

          const response = await fetch(
            `${host}/roteiro`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                user_id: user_id,
                user_lat: -20.3720859,//position.coords.latitude,
                user_lon: -40.391541//position.coords.longitude
              })
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.erro);
          }

          setRoteiro(data);

        } catch (error) {
          console.error("Erro ao buscar roteiro:", error);
        }
      //},
      //(error) => {
      //  console.error("Erro ao obter localização:", error);
      //}
    //);
  }
  
  async function resultadoQuiz(
    id_user: number,
    resultado: number[]
  ) {
    try {
      const response = await fetch(
        `${host}/quiz/resultado`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            respostas: resultado,
            id: id_user
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Erro ao gerar resultado: ${response.status}`
        );
      }

      const data = await response.json();

      setResultsQuiz(data);

      return data;

    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async function buscar_historico(id_user:number){
    try {
      
      const response = await fetch(
        `${host}/quiz/historico/${id_user}`,
        {method: "GET"}
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro);
      }

      setHistorico(data)

    } catch ( error) {
      console.error( error)
    }
  }

  async function removerQuizHistorico(
    id_quiz: string
  ) {
    try {
      const response = await fetch(
        `${host}/quiz/deletar/${id_quiz}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Erro ao remover historico: ${response.status}`
        );
      }

      console.log("Quiz removido");
    } catch (error) {
      console.error(error);
    }
  }

  async function buscarPerfil(id_user: number) {
    try {
      const response = await fetch(
        `${host}/usuario/${id_user}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro);
      }

      setPerfilUsuario(data);

    } catch (error) {
      console.error(error);
    }
  }

  async function editarPerfil(
    id_user: number,
    perfil: PerfilUsuario
  ) {
    try {
      const response = await fetch(
        `${host}/usuario/${id_user}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(perfil),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro);
      }

      setPerfilUsuario(data);

    } catch (error) {
      console.error(error);
    }
  }

  async function esqueciSenha(email: string) {
    try {
      setLoading1(true);
      setErro(null);

      const response = await fetch(
        `${host}/auth/esqueci-senha`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro);
      }

      return data;

    } catch (error: any) {
      setErro(error.message);
      throw error;
    } finally {
      setLoading1(false);
    }
  }

  async function validarToken(token: string) {
    try {

      setLoading1(true);
      setErro(null);

      const response = await fetch(
        `${host}/auth/validar-token/${token}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro);
      }

      return data;

    } catch (error: any) {

      setErro(error.message);
      throw error;

    } finally {

      setLoading1(false);

    }

  }

  async function redefinirSenha(
    token: string,
    novaSenha: string
  ) {

    try {

      setLoading1(true);
      setErro(null);

      const response = await fetch(
        `${host}/auth/redefinir-senha`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            nova_senha: novaSenha,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro);
      }

      return data;

    } catch (error: any) {

      setErro(error.message);
      throw error;

    } finally {

      setLoading1(false);

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
          grafico_fvoritos,
          graf_favorites,
          grafico_local_municipio,
          graf_local_municipio,
          grafico_categorias,
          graf_categorias,
          carregarDestinos,
          destinos,
          setCategoriaSelecionada,
          categoriaSelecionada,
          adicionarFavorito,
          removerFavorito,
          toggleFavorito,
          usuario,
          carregarPerguntas,
          perguntas,
          loading,
          roteiroCarga,
          roteiro,
          historico,
          buscar_historico,
          resultsQuiz,
          resultadoQuiz,
          removerQuizHistorico,
          perfilUsuario,
          buscarPerfil,
          editarPerfil,
          esqueciSenha,
          validarToken,
          redefinirSenha,
          loading1,
          erro
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