import { Link, useLocation } from "@tanstack/react-router";
import { Icon } from "./Icon";

const items = [
  { to: "/home", icon: "home", label: "Início" },
  { to: "/mapa", icon: "explore", label: "Mapa" },
  { to: "/roteiro", icon: "map", label: "Roteiro" },
  { to: "/favoritos", icon: "favorite", label: "Favoritos" },
  { to: "/perfil", icon: "person", label: "Perfil" },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[2rem] bg-surface/70 backdrop-blur-xl shadow-[0px_-12px_32px_rgba(24,28,32,0.06)] flex justify-around items-center pt-3 pb-8 px-4">
      {items.map((it) => {
        const active = pathname === it.to;
        return (
          <Link
            key={it.to}
            to={it.to}
            className={`flex flex-col items-center justify-center transition-transform active:scale-90 hover:-translate-y-0.5 ${
              active
                ? "text-primary drop-shadow-[0_0_8px_rgba(0,94,151,0.3)]"
                : "text-on-surface-variant"
            }`}
          >
            <Icon name={it.icon} filled={active} />
            <span className="text-[10px] uppercase tracking-widest font-bold mt-1">
              {it.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
