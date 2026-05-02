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
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALO0zJA0pnt_0cNln21v5Fr3ecqWKAJn9DpVXkFRNW40qL1YWgNTNj2T-sK7aU4JBoooPPLwIrY11u5-9erwi_UDnJ6hiZmwdxWojltsjGflk_7b9HxUDzDCtPMl8kuwdM_OWHDamcILxY5mPF62qwF_E-9oBJkY757dxEwbTVxR_z1oks0Tue1WuVLY_JliMpmKl4GwaGYIWRY2b6XMxq8XpViezR1940wlcz7oge1vXlqW4iM8lHckB2zitqA5w_T1dpY-5em4q_",
  },
  {
    time: "12:30",
    badge: "Almoço",
    icon: "restaurant",
    title: "Ilha das Caieiras",
    desc: "Experiência gastronômica autêntica com a verdadeira Moqueca Capixaba à beira do manguezal.",
    next: "15 min até a próxima parada (6.5km)",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB95um0-MdfGutLrbo_0IEelwGjrTLAhBKhzyPMHJz7Cvb9N29yEOUJ6fi_NQBT7eyABFrQMPqjv4jrSTKAr0IiDIcpP_eui5-LFl8zHhKPqHUthmiFOKSXjpPo-LKwgSA7tQH419gRzS38T3cBmcTXhb8y-gECPJDumbnhnoHRklQFmdjMqWcGa8U7mdeStiV1yeLYmg-HiAT9VdRAfIcF7rzrz4Yioa0vSYxzNbSa_YJbFN56JNKSe-Fo3TZFtgLaN40aMpiM2GC-",
  },
  {
    time: "16:00",
    badge: "Pôr do Sol",
    icon: "wb_sunny",
    title: "Curva da Jurema",
    desc: "Relaxe nos quiosques modernos enquanto aprecia o pôr do sol entre Vitória e a Terceira Ponte.",
    next: null,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMEeoLOOz4IYkVgj0DFpfuqvAcqLi6UaWXF4-oC3zu_DPH8UqOioEQl6tNAtjqcFftiXUxKCR36ILsXffIPykppvws3Clw-AoCvQoW9q6siqUTWY-fx-ocPv1SThCIFPgCvpKrrvQFxJBomfva02T0joOBmZRaZjpihj_ZrQ-6n5czEcydmzTdkQW66Cz87V9HAm1_pO484b6HDekz1ZT4510QlGyXABA_zN-H3SGT4qvIicQu2F3eS3j0FfTGVrADDBV8uP6gGHUI",
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
