import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/home")({
  head: () => ({
    meta: [
      { title: "TurismES — Explore o Espírito Santo" },
      {
        name: "description",
        content: "Descubra os melhores destinos turísticos do Espírito Santo.",
      },
    ],
  }),
  component: HomePage,
});

const categories = [
  { icon: "terrain", label: "Montanhas", bg: "bg-secondary-container", fg: "text-on-secondary-container", id:2 },
  { icon: "beach_access", label: "Praias", bg: "bg-primary-container", fg: "text-on-primary-container", id:3 },
  { icon: "restaurant", label: "Gastronomia", bg: "bg-tertiary-container", fg: "text-on-tertiary-container", id:4 },
  { icon: "account_balance", label: "História", bg: "bg-surface-variant", fg: "text-on-surface-variant", id:1 },
];



function HomePage() {

  const {
    destinos,
    carregarDestinos,
    categoriaSelecionada,
    setCategoriaSelecionada
  } = useAuth();

  useEffect(() => {
    carregarDestinos();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <TopBar />
      <main className="pb-32 pt-20">
        {/* Hero */}
        <section className="px-6 mb-10">
          <div className="relative w-full h-[460px] rounded-2xl overflow-hidden flex flex-col justify-end p-8 bg-surface-container-highest">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAFzuDkpDPkKAkEjMjMBG45K5Jk-7_4VE6zP_dDGSMMpA9scKbtuQanB1yiYZtB4L9HZBpzih97GKb1f5f4XiBjZVuMmsDPB_US0IXxhfXNQKvIaLBsNYmSroCXJXQBkl17kalxM5w=w270-h312-n-k-no"
              alt="Convento da Penha"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent" />
            <div className="relative z-10">
              <h1 className="text-white text-4xl font-extrabold tracking-tight mb-2 leading-tight">
                Sua jornada capixaba começa aqui.
              </h1>
              <p className="text-white/80 text-lg mb-6 max-w-[280px]">
                Descubra qual destino mais combina com você.
              </p>
              <button
                onClick={() => navigate({ to: "/quiz" })}
                className="bg-tertiary text-on-tertiary px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                Iniciar Quiz
                <Icon name="quiz" />
              </button>
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section className="mb-10">
          <div className="px-6 flex justify-between items-end mb-4">
            <h2 className="text-2xl font-bold tracking-tight text-on-surface">
              Explorar por
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto px-6 hide-scrollbar">
            {categories.map((c) => (
              <button
                key={c.label}
                onClick={() => {

                  const novaCategoria =
                    categoriaSelecionada === c.id
                      ? null
                      : c.id;

                  setCategoriaSelecionada(novaCategoria);

                  carregarDestinos(novaCategoria ?? undefined);
                }}
                className="flex-shrink-0 flex flex-col items-center gap-2"
              >
                <div className={`w-16 h-16 rounded-full ${c.bg} ${c.fg} flex items-center justify-center`}>
                  <Icon name={c.icon} className="text-3xl" style={{ fontSize: 30 }} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">
                  {c.label}
                </span>
              </button>
            ))}
          </div>
        </section>
        
        
        {/* Destaques */}
        <section>
          <div className="px-6 flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Destinos em Destaque</h2>
              <p className="text-on-surface-variant text-sm">Os favoritos da temporada</p>
            </div>
            <Link to="/destinos" className="text-primary font-bold text-sm">Ver todos</Link>
          </div>
          <div className="flex gap-6 overflow-x-auto px-6 hide-scrollbar pb-4">
            {destinos.map((d) => (
              <div key={d.id} className="flex-shrink-0 w-72 bg-surface-container-lowest rounded-2xl overflow-hidden flex flex-col shadow-sm">
                <div className="relative h-48">
                  <img className="w-full h-full object-cover" src={d.image_url} alt={d.name} />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest">
                    {d.categoria}
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
                      <Link
                        to="/destino/$nome"
                        params={{ nome: d.slug }}
                        className="text-primary font-bold active:scale-95 transition-transform"
                      >
                        Explorar
                      </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
