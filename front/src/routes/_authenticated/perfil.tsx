import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({
    meta: [{ title: "Perfil — TurismES" }],
  }),
  component: PerfilPage,
});

const options: { icon: string; label: string; color: string; to?: string }[] = [  { icon: "person_edit", label: "Editar Dados", color: "text-primary", to: "/editar-dados" },
  //{ icon: "landscape", label: "Preferências Turísticas", color: "text-secondary", to: "/preferencias" },
  { icon: "history_edu", label: "Histórico de Quizzes", color: "text-tertiary", to: "/historico" },
  { icon: "monitoring", label: "Gráficos", color: "text-primary", to: "/graficos" },
];

function PerfilPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  function sair(){
    logout();
    navigate({ to: "/login" });
  }
  const usuario = auth.getInfoUser();

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      <TopBar avatar={false} />
      <main className="pt-24 px-6 max-w-md mx-auto">
        <section className="flex flex-col items-center mb-10">
          <div className="w-32 h-32 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-extrabold shadow-lg">
            {usuario?.username?.charAt(0).toUpperCase()}
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight mt-4 mb-1">
            {usuario?.username}
          </h2>

          <p className="text-on-surface-variant">
            {usuario?.email}
          </p>
        </section>

        

        <section className="flex flex-col gap-3 mb-12">
          <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest ml-1 mb-2">
            Gerenciamento
          </h3>
          {options.map((o) => (
            <button
              key={o.label}
              onClick={() => o.to && navigate({ to: o.to })}
              className="w-full flex items-center justify-between p-4 bg-surface-container-low hover:bg-surface-container-high transition-colors rounded-2xl group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center ${o.color} shadow-sm`}>
                  <Icon name={o.icon} />
                </div>
                <span className="font-semibold text-on-surface">{o.label}</span>
              </div>
              <Icon name="chevron_right" className="text-outline-variant group-hover:text-primary transition-colors" />
            </button>
          ))}
        </section>

        <section className="mb-12">
          <button
            onClick={() => sair()}
            className="w-full py-4 px-6 rounded-full bg-surface-container-highest text-error font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <Icon name="logout" />
            Sair
          </button>
          <p className="text-center text-[10px] text-on-surface-variant/50 uppercase tracking-widest mt-6">
            Versão 2.4.0 • Feito com orgulho no ES
          </p>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
