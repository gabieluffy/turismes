import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";

export const Route = createFileRoute("/_authenticated/mapa")({
  head: () => ({
    meta: [{ title: "Mapa — TurismES" }],
  }),
  component: MapaPage,
});

const markers = [
  {
    name: "Convento da Penha",
    pos: "left-[35%] top-[35%]",
    bg: "bg-primary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDy0qHhnfVOqa3trKZKKmgIOUUbQpb6wiFgEwRupxBwSgtYNdkpPknuJTcT9HHfXuOjgftL-s4Xi4cJIKPS9bYjd_twicxvcRPjBvc3meHVu5cpzKdB5Os35jODxl9B7fWBqxG2X6XPMT_PjRg91ajFx_QM-nBz1n2GPowMEKQwxCrPuD8uKoHbvA7H92eNBEym0ik_E6VZpETP2-TZOzxCqIH7gI4ZMzek2xfxku1h9lcpBYfgwZanM2iRxJja2lTdOuDWe1jWpHqX",
  },
  {
    name: "Pedra Azul",
    pos: "left-[20%] top-[55%]",
    bg: "bg-secondary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpoGR2-TTHpnO6zo3jNhyixfYZmHt6DyYtDeH4NM39q-AvppNF1eHUA5vBOsE1f_BspvkljyDCzoIn41fqqG9KButUt8mtMSc-6NN776rriO2TMg6iHp0WzXyVQ_7TuJU_-6LKYwGwhd9GTKkf24PDUl5xV4wJJyXkzPF4hiBsIN390aZfBqcJVvdPnGGbkScJiYTV_4Drkiink41J5FDUGBDZnyWEZD_TO5ZXEmUnCwLQt6VPaBDSj4xqmLJ_7FRQJlzDcqyOZvSa",
  },
  {
    name: "Praia do Morro",
    pos: "left-[60%] top-[50%]",
    bg: "bg-tertiary",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSD-WX4MVnLiPqBou5oIOBDrxl44PL0pf5dj0rNo_tjrOafhfDxx7lSGC2oNbNq26H6SXa4rJk_t89WstivNGq8m6Uz1Um1pny5-pyr4SX_NHNZpxs463ta-pMV80dicMi80EgbORk6QY7yN17OGgkyp0WBNrmzfaks0oxDaiUoRnwPCUbuZAJbriIk-0cDjBH2eY57zwSu8ecCn7kwZae-Z8RWmiE_eNG8TbT0vgmuIoS_TPuH3UOq4OaKjcvKleMHTuvX3Z2G_hz",
  },
];

function MapaPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen overflow-hidden">
      <TopBar />
      <main className="relative h-screen w-full overflow-hidden bg-surface-container">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "radial-gradient(#005e9715 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          <img
            className="w-full h-full object-cover opacity-20 grayscale brightness-125"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsztLzx7LAz76Gcm3XswKTV9mJJCr3YIj80hPQ2fKL6Qq_kylZw7IkX3gziSbISM04pZloIYMqO8HK1lLgXUVhrgtn-PfqSQALo-I9xJkKXsVP24kVBaj-jZaF795UG2McHcMKRjcfy0-oISIPnNt_24Z1boImQg7B_zzEidn2qL0F_Ro3x5G1Iz-ArX0szyJSe8EfXpMiRBJ9LiT9o0paZqNTdlp2kWscuLJqwhCI7VsVc5vuAtJRm6U6jZVPRksQLG94VodijWWr"
            alt=""
          />
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none p-6 flex flex-col items-center">
          <div className="w-full max-w-xl pointer-events-auto space-y-4 mt-20">
            <div className="flex items-center bg-surface-container-lowest/90 backdrop-blur-md rounded-full px-6 py-4 shadow-lg">
              <Icon name="search" className="text-outline mr-3" />
              <input
                className="bg-transparent border-none focus:outline-none w-full text-on-surface placeholder:text-outline/60 font-medium"
                placeholder="Para onde vamos hoje?"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {["Praias", "Montanhas", "Cultura", "Gastronomia"].map((t, i) => (
                <button
                  key={t}
                  className={`flex-none px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition ${
                    i === 0
                      ? "bg-primary text-on-primary shadow-lg"
                      : "bg-surface-container-lowest/80 backdrop-blur-sm text-on-surface-variant border border-outline/10"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {markers.map((m) => (
            <div key={m.name} className={`absolute ${m.pos} pointer-events-auto group`}>
              <div className="relative flex flex-col items-center">
                <div className="bg-surface-container-lowest p-1 rounded-2xl shadow-xl transform transition-transform group-hover:scale-110">
                  <div className="w-14 h-14 rounded-xl overflow-hidden">
                    <img className="w-full h-full object-cover" src={m.img} alt={m.name} />
                  </div>
                </div>
                <div className={`mt-2 ${m.bg} px-3 py-1 rounded-full shadow-lg`}>
                  <span className="text-[10px] text-white font-black tracking-widest uppercase">
                    {m.name}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-32 right-6 pointer-events-auto">
            <button className="w-14 h-14 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-xl text-primary hover:bg-primary hover:text-on-primary transition active:scale-90">
              <Icon name="my_location" filled />
            </button>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
