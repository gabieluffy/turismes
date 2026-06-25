import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({
    meta: [{ title: "Perfil — TurismES" }],
  }),
  component: PerfilPage,
});

const options: { icon: string; label: string; color: string; to?: string }[] = [  { icon: "person_edit", label: "Editar Dados", color: "text-primary" },
  { icon: "landscape", label: "Preferências Turísticas", color: "text-secondary" },
  { icon: "history_edu", label: "Histórico de Quizzes", color: "text-tertiary", to: "/historico" },
  { icon: "tune", label: "Configurações", color: "text-on-surface-variant" },
  { icon: "monitoring", label: "Gráficos", color: "text-primary", to: "/graficos" },
];

function PerfilPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  function sair(){
    logout();
    navigate({ to: "/login" });
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      <TopBar avatar={false} />
      <main className="pt-24 px-6 max-w-md mx-auto">
        <section className="flex flex-col items-center mb-10">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg ring-4 ring-surface-container-lowest">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJx9as3zI6EcdXaoeUuIE5i8TLdj3ED5H3QXTW3RG6OGOyN-w3xMvGy6Ld8hoH3G9-7jVskQXAEnB4rtkzy7k9c6zUPM55RrANr5rZsbYvme3a7DnUyJGLZ8Eh1jgSmXCcIlsa7LgGoMJex4Hjb-YgneaExjyWhGw9zqasT7GGHjJyjtvC00Iz6KKaB9LBEp9z5o0stWjVcZ1pinxVGSzOb6ZZZcm47mwryUtKIPSuYkvbhk4e1huK8ojvADxQRP7RFDcKzpDIjvZ9"
                alt="João Capixaba"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-secondary text-on-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
              Level 5
            </div>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight mb-1">João Capixaba</h2>
          <div className="flex items-center gap-2 bg-primary-container/10 text-primary px-4 py-1.5 rounded-full">
            <Icon name="verified" filled style={{ fontSize: 16 }} />
            <span className="text-sm font-semibold">Explorador Nível 5</span>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-surface-container-lowest p-5 rounded-2xl flex flex-col gap-1 shadow-sm">
            <span className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest">
              Conquistas
            </span>
            <span className="text-2xl font-extrabold text-primary">12</span>
            <span className="text-xs text-on-surface-variant/80">Distintivos Capixabas</span>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-2xl flex flex-col gap-1 shadow-sm">
            <span className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest">
              Viagens
            </span>
            <span className="text-2xl font-extrabold text-secondary">28</span>
            <span className="text-xs text-on-surface-variant/80">Destinos no ES</span>
          </div>
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
