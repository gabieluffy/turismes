

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";

import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/historico")({
  head: () => ({
    meta: [{ title: "Histórico de Quizzes — TurismES" }],
  }),
  component: HistoricoPage,
});


export interface CategoriaHistorico {
  categoria_id: number;
  categoria_nome: string;
  pontuacao: number;
}

export interface QuizHistorico {
  quiz_id: string;
  data_realizacao: string;
  pontuacao_total: number;
  categorias: CategoriaHistorico[];
}


function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function HistoryCard({
  entry,
  onDelete
}: {
  entry: QuizHistorico;
  onDelete: (quizId: string) => void;
}) {
  
  const {
    removerQuizHistorico
  } = useAuth();
  const [open, setOpen] = useState(false);
  
  const categoriaVencedora = [...entry.categorias].sort(
    (a, b) => b.pontuacao - a.pontuacao
  )[0];
  
  return (
    <li className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5"
        >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">
              {categoriaVencedora?.categoria_nome}
            </h3>

            <p className="text-xs text-on-surface-variant mt-1">
              {formatDate(entry.data_realizacao)}
            </p>
          </div>

          <div className="text-right">
            <p className="font-bold">
              {entry.pontuacao_total} pts
            </p>

            <Icon
              name={open ? "expand_less" : "expand_more"}
            />
          </div>
        </div>
      </button>

      {open && (
        <div className="border-t border-outline-variant/10 p-5">
          <h4 className="font-semibold mb-3">
            Pontuação por categoria
          </h4>

          <div className="space-y-2">
            {entry.categorias.map((categoria) => (
              <div
                key={categoria.categoria_id}
                className="flex justify-between bg-surface-container-low p-3 rounded-xl"
              >
                <span>{categoria.categoria_nome}</span>

                <span className="font-bold">
                  {categoria.pontuacao} pts
                </span>
              </div>
            ))}
          </div>
          
        <button
          onClick={() => onDelete(entry.quiz_id)}
        >
          Apagar
        </button>
        </div>
      )}
    </li>
  );
}

function HistoricoPage() {

  const [items, setItems] = useState<QuizHistorico[]>([]);
  const [loaded, setLoaded] = useState(false);
  const user = auth.getInfoUser();

  const {
    historico,
    buscar_historico,
    removerQuizHistorico
  } = useAuth();
  
  useEffect(() => {
    if (user) {
      buscar_historico(user.id);
    }

    setLoaded(true);
  }, []);
  
  useEffect(() => {
    setItems(historico);
  }, [historico]);

  async function handleDelete(quizId: string) {
    await removerQuizHistorico(quizId);

    if (user) {
      await buscar_historico(user.id);
    }
  }

  function handleClear() {
    if (!confirm("Apagar todo o histórico de quizzes?")) return;
    setItems([]);
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      <TopBar />
      <main className="pt-24 px-6 max-w-2xl mx-auto">
        <header className="mb-8">
          <Link
            to="/perfil"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition"
          >
            <Icon name="arrow_back" style={{ fontSize: 16 }} />
            Perfil
          </Link>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
            Histórico de Quizzes
          </h1>
          <p className="text-on-surface-variant mt-2">
            Toque em um registro para ver o resultado completo com a pontuação
            detalhada de cada categoria.
          </p>
        </header>

        {loaded && historico.length === 0 && (
          <section className="text-center bg-surface-container-lowest rounded-3xl p-10 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-primary-container/20 text-primary mx-auto flex items-center justify-center mb-4">
              <Icon name="history_edu" style={{ fontSize: 32 }} />
            </div>
            <h2 className="text-xl font-bold mb-2">
              Nenhum quiz por aqui ainda
            </h2>
            <p className="text-sm text-on-surface-variant mb-6">
              Faça o quiz para descobrir seu perfil de viajante capixaba.
            </p>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-white px-6 py-3 rounded-full font-bold shadow-lg active:scale-95 transition"
            >
              <Icon name="play_arrow" />
              Fazer Quiz
            </Link>
          </section>
        )}

        {historico.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                {historico.length}{" "}
                {historico.length === 1 ? "registro" : "registros"}
              </span>
            </div>

            <ul className="space-y-4">
            {items.map((entry) => (
              <HistoryCard
                key={entry.quiz_id}
                entry={entry}
                onDelete={handleDelete}
              />
            ))}
            </ul>

            <div className="mt-8 text-center">
              <Link
                to="/quiz"
                className="inline-flex items-center gap-2 bg-surface-container-high text-on-surface px-6 py-3 rounded-full font-bold hover:bg-surface-container-highest transition"
              >
                <Icon name="refresh" />
                Refazer Quiz
              </Link>
            </div>
          </>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
