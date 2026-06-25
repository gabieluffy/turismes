import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/hooks/useAuth"
import { useEffect, useState } from "react";
import { auth } from "@/lib/auth";
export const Route = createFileRoute("/_authenticated/favoritos")({
  head: () => ({
    meta: [{ title: "Favoritos — TurismES" }],
  }),
  component: FavoritosPage,
});

function FavoritosPage() {

  async function handleRemoverFavorito(id_place: number) {

    if (!id_user) return;

    await removerFavorito(id_user, id_place);

    const token = localStorage.getItem("token");

    if (token) {
      await buscar_favorites_places(id_user, token);
    }
  }

  const {
    get_all_favorites_places,
    buscar_favorites_places,
    removerFavorito
  } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = auth.getInfoUser();
    if(token && user) {
      buscar_favorites_places(user.id, token)   
    }
  }, []);

  const [favorito, setFavorito] = useState(false)
  const user = auth.getInfoUser();
  const id_user = user?.id;
  
  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      <TopBar />
      <main className="pt-24 px-6 max-w-5xl mx-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">Meus Favoritos</h2>
          <p className="text-on-surface-variant max-w-md">
            Os lugares que conquistaram seu coração no Espírito Santo.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {get_all_favorites_places.map((f) => (
            <article
              key={f.place.name}
              className="group flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={f.place.image_url.toString()}
                  alt={f.place.name}
                />
              <button
                onClick={() => handleRemoverFavorito(f.place.id)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full shadow-lg hover:scale-110 transition"
              >
                <Icon
                  name="favorite"
                  filled
                  className="text-tertiary"
                />
              </button>
                <div className="absolute bottom-4 left-4">
                  <span className={`bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-sm`}>
                    {f.place.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-1">{f.place.name}</h3>
                <div className="flex items-center text-on-surface-variant text-sm mb-6">
                  <Icon name="location_on" className="mr-1" style={{ fontSize: 16 }} />
                  {f.place.city}
                </div>
                <button className="mt-auto w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-full active:scale-95 transition-all shadow-lg shadow-primary/20">
                  Planejar Visita
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
