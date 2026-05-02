import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";

export const Route = createFileRoute("/_authenticated/favoritos")({
  head: () => ({
    meta: [{ title: "Favoritos — TurismES" }],
  }),
  component: FavoritosPage,
});

const favoritos = [
  {
    name: "Convento da Penha",
    location: "Vila Velha",
    tag: "Histórico",
    tagBg: "bg-primary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBquidZAma9oH-sjhaLtbo-wTBgqAIUtBWXk6im6zbpiYsk1znVASkbJ1THHOBxZlT9zOWZBzL5372kEp9bt2nKk_n7ITu4ZDkbUSgMBpocN40fHkSKaBAgJ-Z57C3-dg_6pZ5OlfkEYtYydHFUVm8yBUD_roXfvCyRiRkUWXyhqpMIM5ffMl3J0xKCpcp-uqz9HM-E1ov7PYd-14tksSEr3Xe7gA-2UmrO3iVbc7tdruekcx5TGVp13Rm8mDYcmMt9sHVB-hG7cy9m",
  },
  {
    name: "Pedra Azul",
    location: "Domingos Martins",
    tag: "Montanhas",
    tagBg: "bg-secondary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSCrlQ_zg5ZdRUPf5yzt-GjF77L5YGjPpwczNkm23g25zxdQ2Y4dgo5QiUvw8zwG5zemf5TTxzKTUM7uvN-stXN4KVTsPX4flj6od_De105eZvqooYT59iUnYJCLRSD7Azv1IGEWcBBH_GkvyQHpnLlGuk0uUM6btXnxSf0NcCVa4nHSTsuCIpPAlQG4JzTIywGJQbbFuv3YPAqCsXkf_Vb4AhVzEDZre3Afo-oljbEF6v6QvHYWIkwtizdl4KWgow5m2kTs1lovN6",
  },
  {
    name: "Praia do Morro",
    location: "Guarapari",
    tag: "Litoral",
    tagBg: "bg-primary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL5Ilyz-2hJQ_dgEpx4C2A13O3W1OHainO_fXfZDL09WbclcksUIICwzpF6G0JmuslEYf2-ix3EsSMW8YJrgSuoznk3g_977Y7atipV_o-oWpdvz-FDLby3vswTx6lDg29S5jtDwYo8Qk_dGd4Mx7PnIn8HjLwpm_fvWLUOKdJbxDLiVpx4sdaU3LW4STGnr36gz8wFmkczwaX8El6in-x0_hnMczjOOK9BiF5R-KJpvKkVRtfm2iBzeGGf13uWeK2ZDuPsYboog7W",
  },
  {
    name: "Mosteiro Zen Morro da Vargem",
    location: "Ibiraçu",
    tag: "Espiritualidade",
    tagBg: "bg-tertiary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAp_HfK0q_IxNrBG1m6uXHRnNJaGZJo4ijPRzNH8ILIWqWRkl4jY-LCG-q1MsXfhdEZEaanCJb0n__N95ZAAM6WxB0F3k_H8TYxi5sGJG4UXwVFMQY_WPLBPZVfj3NQutSCFOLEfKkG9SCyOkkQZ1nULIKWuZxLZyexIZ-UHZ9Hs1f3R4TVLXlR5QpJ_cIhIorFKnRIkQgl9cEJz1ptf4ATkLM2N9Ay8Euwb1ipbK6Udo7-_b-Zdg2Q9_GRgtZ93RNJz8QaKjST9X1W",
  },
];

function FavoritosPage() {
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
          {favoritos.map((f) => (
            <article
              key={f.name}
              className="group flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={f.img}
                  alt={f.name}
                />
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full shadow-lg">
                  <Icon name="favorite" filled className="text-tertiary" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className={`${f.tagBg} text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-sm`}>
                    {f.tag}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-1">{f.name}</h3>
                <div className="flex items-center text-on-surface-variant text-sm mb-6">
                  <Icon name="location_on" className="mr-1" style={{ fontSize: 16 }} />
                  {f.location}
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
