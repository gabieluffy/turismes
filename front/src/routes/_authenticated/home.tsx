import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import Plot from "react-plotly.js";
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
  { icon: "terrain", label: "Montanhas", bg: "bg-secondary-container", fg: "text-on-secondary-container" },
  { icon: "beach_access", label: "Praias", bg: "bg-primary-container", fg: "text-on-primary-container" },
  { icon: "restaurant", label: "Gastronomia", bg: "bg-tertiary-container", fg: "text-on-tertiary-container" },
  { icon: "account_balance", label: "História", bg: "bg-surface-variant", fg: "text-on-surface-variant" },
];

const destinos = [
  {
    name: "Pedra Azul",
    location: "Domingos Martins, ES",
    tag: "Montanha",
    rating: 4.9,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqdzTD92SBTft3cxociHXJiZScrj6dxV1QNinv5GdS4kvjaOzPxYXPEuPbFsy6gTCpg6J5eoAGCPohd0vX07xzZzVcWoQd7fWRY9bBt4ehNcU-eCK_KhmuF_OFTntTxK2H0isTAltgbRgTaqOsLK3dRSzHvA8HgxZXY91HQMrWw_9nPhTj1X8e-F1L06F7pF28avOSMNKeS8FWhWxmAwnJVjpRyHTudQGYI0jN8lOHD0_tyXn431ddSs9qBdab76KOibx8eB7IlFb6",
  },
  {
    name: "Guarapari",
    location: "Litoral Sul, ES",
    tag: "Praia",
    rating: 4.7,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBE3SS84GAJYnYdSPkeq1DLLkM7swPmw3Ir0a_H3ln7Dz0ya_1UZafs5o9STPh4BpH0IWGctrRWFbtb0OeAq8Id8dJ7y5kCu8qeBIV0OGizMbsVHOKQDBOKpmeK3isHufJAgs56ZMqIx0FdZStfSOou_xZT-In0e4n0jJByK0xkU0UbA-JB7ppcBBrhnb6LajDQiuLI9bTgQ2cPuyZsVE6loHmSiILUyNHd-FXC1oRBqBztMJx_qniFSPiFV4JdnznABuKdwI8T4pvm",
  },
  {
    name: "Domingos Martins",
    location: "Região Serrana, ES",
    tag: "Cultura",
    rating: 4.8,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZcUPhqU8ZC_TbUmDtx5VD39maI2RIKbJy7FO1Z-pE2gVkMy9EwACEiBtVmkuMPD_dsvnygE2xdq-mDRtQ0_Jq-AT_H4NkTVQlyA4CEau396Eo61ITv78Xb4Zgjq9YtzuFtXccTcsE5vxIsDPvZhYMroFimsI0rNXQHF5J28slmByY9xUzw1pXjGp900MwKyoQvb6wtX_WMsoh-jR2k33mdz5oMLkR0oqOicpAEjn8Vy3S0mEFfR7eFmH8_BfDtCL8pBZOD8nVhX5P",
  },
];

function HomePage() {
  const { grafico, dados } = useAuth();
  useEffect(() => { grafico() }, [])
  useAuth

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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB3NFMxr7qXROd3jd2X2S6oV6ax85V0OJWEqsbdpSG7UV7QgWq6d7gwF0PSPQhVXu2YqOBakQRZlVwXdG3i5rI3pV19qPVu6TpSsoCuXXOxOMY9FsRL6tU7jJs2D5SCnAUZ5aO2fHgdtyx6gtqEFLLrp7dWAJyUSf3McRecgyctGzjYypqKyhDmvYTlGKwXFOUaikskbJjgMTBpcHM8Q8ruqSai4hkrqz2ed4fD9AOO2r9ut8z4whcYpzlysOcWBBjKQbRUL2fSZHD"
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
              <div key={c.label} className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className={`w-16 h-16 rounded-full ${c.bg} ${c.fg} flex items-center justify-center`}>
                  <Icon name={c.icon} className="text-3xl" style={{ fontSize: 30 }} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Gráfico */}
        <section>
          <div className="px-6 flex justify-between items-end mb-4">
            <Plot
              data={[
                  {
                      x: dados.map(d => d.categoria),
                      y: dados.map(d => d.recomendacao),
                      type: "bar"
                  }
              ]}
              layout={{
                  title: "Preferências turisticas",
                  width: 400,
                  height: 300
              }}
          />
        </div>
        </section>
        
        {/* Destaques */}
        <section>
          <div className="px-6 flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Destinos em Destaque</h2>
              <p className="text-on-surface-variant text-sm">Os favoritos da temporada</p>
            </div>
            <button className="text-primary font-bold text-sm">Ver todos</button>
          </div>
          <div className="flex gap-6 overflow-x-auto px-6 hide-scrollbar pb-4">
            {destinos.map((d) => (
              <div key={d.name} className="flex-shrink-0 w-72 bg-surface-container-lowest rounded-2xl overflow-hidden flex flex-col shadow-sm">
                <div className="relative h-48">
                  <img className="w-full h-full object-cover" src={d.img} alt={d.name} />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest">
                    {d.tag}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-1">{d.name}</h3>
                  <div className="flex items-center gap-1 text-on-surface-variant text-sm mb-3">
                    <Icon name="location_on" style={{ fontSize: 16 }} />
                    {d.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary font-bold flex items-center gap-1">
                      <Icon name="star" filled style={{ fontSize: 16 }} />
                      {d.rating}
                    </span>
                    <span className="text-primary font-bold">Explorar</span>
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
