import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import { QUESTIONS, type Category } from "@/lib/quiz";

export const Route = createFileRoute("/_authenticated/quiz")({
  head: () => ({
    meta: [{ title: "Quiz — TurismES" }],
  }),
  component: QuizPage,
});

function QuizPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Partial<Record<Category, number>>>({});
  const [selected, setSelected] = useState<number | null>(null);

  const total = QUESTIONS.length;
  const q = QUESTIONS[step];
  const progress = ((step + (selected !== null ? 1 : 0)) / total) * 100;

  function handleNext() {
    if (selected === null) return;
    const a = q.answers[selected];
    const newScores = {
      ...scores,
      [a.category]: (scores[a.category] ?? 0) + a.points,
    };
    setScores(newScores);

    if (step + 1 >= total) {
      const params = new URLSearchParams();
      (Object.keys(newScores) as Category[]).forEach((c) => {
        params.set(c, String(newScores[c] ?? 0));
      });
      navigate({ to: "/resultado", search: Object.fromEntries(params) as never });
    } else {
      setStep(step + 1);
      setSelected(null);
    }
  }

  function handlePrev() {
    if (step > 0) {
      setStep(step - 1);
      setSelected(null);
    }
  }

  const optionAccent = useMemo(
    () => ["bg-primary-container", "bg-secondary", "bg-tertiary", "bg-primary"],
    [],
  );

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col">
      <TopBar />
      <main className="flex-1 pt-24 pb-32 px-6 max-w-2xl mx-auto w-full">
        {/* Progresso */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Etapa {step + 1} de {total}
            </span>
            <span className="text-on-surface-variant font-medium">
              {Math.round(progress)}% concluído
            </span>
          </div>
          <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Pergunta */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-4 leading-[1.1]">
            {q.prompt}
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Escolha a opção que mais combina com você.
          </p>
        </div>

        {/* Opções */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {q.answers.map((a, idx) => {
            const isSelected = selected === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className={`text-left relative overflow-hidden rounded-2xl bg-surface-container-lowest p-6 transition-all duration-300 shadow-sm hover:shadow-lg ${
                  isSelected
                    ? "ring-4 ring-primary scale-[1.02]"
                    : "ring-1 ring-outline-variant/30"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full ${optionAccent[idx % optionAccent.length]} text-white flex items-center justify-center mb-4 shadow`}
                >
                  <Icon name="check" filled={isSelected} />
                </div>
                <span className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                  {a.category.replace("_", " ")} +{a.points}
                </span>
                <h3 className="text-xl font-bold leading-tight">{a.label}</h3>
                {isSelected && (
                  <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center">
                    <Icon name="check" filled style={{ fontSize: 18 }} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 flex items-center justify-between gap-6">
          <button
            onClick={handlePrev}
            disabled={step === 0}
            className="flex items-center gap-2 text-on-surface-variant font-bold uppercase text-xs tracking-widest hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Icon name="arrow_back" />
            Anterior
          </button>
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="bg-gradient-to-r from-primary to-primary-container text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {step + 1 === total ? "Ver Resultado" : "Próximo"}
            <Icon name="arrow_forward" />
          </button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
