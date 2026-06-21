import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useEffect, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import { useAuth, Usuario } from "@/hooks/useAuth";

export const Route = createFileRoute('/_authenticated/destino/$nome')({
 
  head: ({ params }) => ({
    meta: [
      { title: `${params.nome} — TurismES` },
      {
        name: "description",
        content: `Explore ${params.nome} no Espírito Santo.`,
      },
    ],
  }),
  component: DestinoPage,
});

function DestinoPage() {  
  
  const {
    destinos,
    carregarDestinos,
    toggleFavorito,
    get_all_favorites_places,
    buscar_favorites_places,
    usuario,
    adicionarFavorito,
    removerFavorito
  } = useAuth();
  
  useEffect(() => {
    carregarDestinos();
    const token = localStorage.getItem("token");
    
    if(token) {
      buscar_favorites_places(token)   
    }
  }, []);
  
  const { nome } = Route.useParams();
  const destino = useMemo(() => destinos.find((d) => d.slug === nome), [nome]);
  const [favorito, setFavorito] = useState(false)
  
  if (!destino) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center px-6">
        <Icon name="search_off" className="text-6xl text-on-surface-variant mb-4" />
        <h1 className="text-2xl font-bold mb-2">Destino não encontrado</h1>
        <p className="text-on-surface-variant mb-6">O destino que você procura não existe.</p>
        <Link
          to="/home"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold"
        >
          Voltar para Início
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <TopBar />
      <main className="pb-32 pt-20">
        {/* Hero */}
        <section className="px-6 mb-8">
          <div className="relative w-full h-72 rounded-2xl overflow-hidden">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={destino.image_url}
              alt={destino.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-on-surface/20 to-transparent" />
            <button
              type="button"
              onClick={() =>
                toggleFavorito(
                  destino.id,
                  favorito
                )
              }
              aria-label={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-full shadow-lg active:scale-95 transition"
            >
              <Icon
                name="favorite"
                filled={favorito}
                className={favorito ? "text-tertiary" : "text-white"}
                style={{ fontSize: 22 }}
              />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest mb-2">
                {destino.slug}
              </div>
              <h1 className="text-white text-3xl font-extrabold tracking-tight mb-1">
                {destino.name}
              </h1>
              <div className="flex items-center gap-1 text-white/80 text-sm">
                <Icon name="location_on" style={{ fontSize: 16 }} />
                {destino.cidade}
              </div>
            </div>
          </div>
        </section>

        {/* Rating & quick actions */}
        <section className="px-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-secondary font-bold text-lg">
              <Icon name="star" filled style={{ fontSize: 20 }} />
              {destino.average_rating}
              <span className="text-sm text-on-surface-variant font-normal">/ 5.0</span>
            </div>
            <Link
              to="/quiz"
              className="text-primary font-bold text-sm flex items-center gap-1 active:scale-95 transition-transform"
            >
              <Icon name="quiz" style={{ fontSize: 18 }} />
              Refazer Quiz
            </Link>
          </div>
        </section>

        {/* Description */}
        <section className="px-6 mb-8">
          <h2 className="text-xl font-bold tracking-tight mb-3">Sobre</h2>
          <p className="text-on-surface-variant leading-relaxed">{destino.description}</p>
        </section>


        {/* CTA */}
        <section className="px-6 mb-8">
          <button className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
            <Icon name="map" style={{ fontSize: 20 }} />
            Ver no Mapa
          </button>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
