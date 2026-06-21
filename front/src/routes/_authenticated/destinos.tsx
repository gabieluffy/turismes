import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute('/_authenticated/destinos')({
  head: () => ({
    meta: [
      { title: "Todos os Destinos — TurismES" },
      {
        name: "description",
        content: "Explore todos os destinos turísticos do Espírito Santo.",
      },
    ],
  }),
  component: DestinosPage,
});

function DestinosPage() {
  const {
    destinos,
    carregarDestinos
  } = useAuth();

  useEffect(() => {
    carregarDestinos();
  }, []);

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      <TopBar />
      <main className="pt-24 px-6 max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            Todos os Destinos
          </h1>
          <p className="text-on-surface-variant">
            Conheça todos os lugares incríveis do Espírito Santo.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {destinos.map((d) => (
            <Link
              key={d.slug}
              to="/destino/$nome"
              params={{ nome: d.slug }}
              className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 transition-transform"
            >
              <div className="relative h-48">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={d.image_url}
                  alt={d.name}
                />
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest">
                  {d.slug}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-1">{d.name}</h3>
                <div className="flex items-center gap-1 text-on-surface-variant text-sm mb-3">
                  <Icon name="location_on" style={{ fontSize: 16 }} />
                  {d.cidade}, ES
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary font-bold flex items-center gap-1">
                    <Icon name="star" filled style={{ fontSize: 16 }} />
                    {d.average_rating}
                  </span>
                  <span className="text-primary font-bold">Explorar</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
