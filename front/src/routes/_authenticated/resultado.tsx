import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import {
  CATEGORY_META,
  computeWinner,
  type Category,
} from "@/lib/quiz";

type Search = Partial<Record<Category, number>>;

export const Route = createFileRoute("/_authenticated/resultado")({
  head: () => ({
    meta: [{ title: "Resultado do Quiz — TurismES" }],
  }),
  validateSearch: (search: Record<string, unknown>): Search => {
    const out: Search = {};
    (Object.keys(CATEGORY_META) as Category[]).forEach((c) => {
      const raw = search[c];
      const n = typeof raw === "string" ? Number(raw) : typeof raw === "number" ? raw : 0;
      if (!Number.isNaN(n) && n > 0) out[c] = n;
    });
    return out;
  },
  component: ResultPage,
});

function ResultPage() {
  const scores = Route.useSearch();
  const winner = computeWinner(scores);
  const meta = CATEGORY_META[winner];
  const total = Object.values(scores).reduce<number>((a, b) => a + (b ?? 0), 0);

  const ranked = (Object.entries(scores) as [Category, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      <TopBar />
      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <section className="relative mb-12">
          <div className="absolute -top-10 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-20 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
          <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-4">
              Perfil Identificado
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface leading-tight tracking-tight mb-6">
              Seu perfil é{" "}
              <span className="text-primary">{meta.name}</span>!
            </h1>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
              {meta.description}
            </p>

            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <Icon name={meta.icon} style={{ fontSize: 40 }} />
              </div>
              <div>
                <h4 className="font-bold text-on-surface">
                  Categoria dominante: {meta.name}
                </h4>
                <p className="text-sm text-on-surface-variant">
                  Você somou {total} pontos no total — {scores[winner]} deles
                  são da categoria {meta.name}.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pontuação detalhada */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            Sua pontuação
            <div className="h-1 flex-grow bg-surface-container-low rounded-full ml-2" />
          </h2>
          <div className="space-y-3">
            {ranked.map(([cat, pts]) => {
              const m = CATEGORY_META[cat];
              const pct = total > 0 ? (pts / total) * 100 : 0;
              return (
                <div
                  key={cat}
                  className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Icon name={m.icon} className="text-primary" />
                      <span className="font-bold">{m.name}</span>
                    </div>
                    <span className="text-on-surface-variant font-semibold text-sm">
                      {pts} pts
                    </span>
                  </div>
                  <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-12 space-y-4">
          <Link
            to="/roteiro"
            className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Ver Roteiro Detalhado
            <Icon name="arrow_forward" />
          </Link>
          <Link
            to="/quiz"
            className="w-full py-4 bg-surface-container-high text-on-surface rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-surface-container-highest transition"
          >
            <Icon name="refresh" />
            Refazer Quiz
          </Link>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
