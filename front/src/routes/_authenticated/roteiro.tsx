import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";

export const Route = createFileRoute("/_authenticated/roteiro")({
  head: () => ({
    meta: [{ title: "Roteiro — TurismES" }],
  }),
  component: RoteiroPage,
});

const stops = [
  {
    time: "09:00",
    badge: "Parada 01",
    icon: "church",
    title: "Convento da Penha",
    desc: "Inicie o dia com a vista panorâmica mais icônica do Espírito Santo no topo do penhasco.",
    next: "25 min até a próxima parada (12km)",
    img: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFzuDkpDPkKAkEjMjMBG45K5Jk-7_4VE6zP_dDGSMMpA9scKbtuQanB1yiYZtB4L9HZBpzih97GKb1f5f4XiBjZVuMmsDPB_US0IXxhfXNQKvIaLBsNYmSroCXJXQBkl17kalxM5w=w270-h312-n-k-no",
  },
  {
    time: "12:30",
    badge: "Almoço",
    icon: "restaurant",
    title: "Ilha das Caieiras",
    desc: "Experiência gastronômica autêntica com a verdadeira Moqueca Capixaba à beira do manguezal.",
    next: "15 min até a próxima parada (6.5km)",
    img: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcR1bVkhCiGqELN6Wl5ImHWLDfh1YhDCAsSh3YI5JoptO6nSG1OAv7eNOcCTiWoa7KDefimaSFVSwTSXQeaMq-Ns7uU&s=19",
  },
  {
    time: "16:00",
    badge: "Pôr do Sol",
    icon: "wb_sunny",
    title: "Curva da Jurema",
    desc: "Relaxe nos quiosques modernos enquanto aprecia o pôr do sol entre Vitória e a Terceira Ponte.",
    next: null,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy5k-6SdUIfhCtqoAiq_K8DPL3uUkVFnUzMg&s",
  },
];

function RoteiroPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      <TopBar />
      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <section className="mb-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-2 block">
                Roteiro Atual
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
                Vitória &<br />Vila Velha
              </h2>
            </div>
            <button className="bg-tertiary text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg active:scale-95 transition-transform">
              <Icon name="map" style={{ fontSize: 16 }} />
              <span className="font-bold text-sm">Ver no Mapa</span>
            </button>
          </div>
          <div className="flex gap-4 flex-wrap">
            <div className="bg-surface-container-low px-4 py-2 rounded-full flex items-center gap-2">
              <Icon name="distance" className="text-primary" style={{ fontSize: 16 }} />
              <span className="text-on-surface-variant text-sm font-semibold">18.5 km total</span>
            </div>
            <div className="bg-surface-container-low px-4 py-2 rounded-full flex items-center gap-2">
              <Icon name="schedule" className="text-primary" style={{ fontSize: 16 }} />
              <span className="text-on-surface-variant text-sm font-semibold">8h de passeio</span>
            </div>
          </div>
        </section>

        <div className="relative">
          <div
            className="absolute left-[19px] top-4 bottom-4 w-1 rounded-full opacity-30"
            style={{
              background:
                "linear-gradient(to bottom, #1b6d24 0%, #1b6d24 80%, transparent 100%)",
            }}
          />
          {stops.map((s, i) => (
            <div key={i} className={`relative pl-14 ${i < stops.length - 1 ? "mb-12" : ""}`}>
              <div className="absolute left-0 top-1 w-10 h-10 bg-surface-container-lowest rounded-full flex items-center justify-center border-4 border-secondary shadow-sm z-10">
                <Icon name={s.icon} className="text-secondary" style={{ fontSize: 20 }} />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-secondary font-bold text-lg">{s.time}</span>
                  <span className="bg-secondary-container/30 text-on-secondary-container text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                    {s.badge}
                  </span>
                </div>
                <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm group">
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={s.img}
                      alt={s.title}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-1">{s.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
                {s.next && (
                  <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium ml-1">
                    <Icon name="directions_car" style={{ fontSize: 16 }} />
                    <span>{s.next}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
