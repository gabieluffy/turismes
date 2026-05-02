import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/login" }), 2000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="bg-dawn-gradient min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[60%] opacity-30 bg-gradient-to-t from-primary-container to-transparent blur-3xl" />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <div className="mb-6 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-150" />
          <div className="glass-panel w-28 h-28 rounded-full flex items-center justify-center shadow-2xl shadow-primary/20 border border-white/40">
            <span
              className="material-symbols-outlined text-primary text-7xl"
              style={{ fontSize: 72, fontVariationSettings: "'wght' 200" }}
            >
              explore
            </span>
          </div>
        </div>
        <h1 className="text-6xl font-extrabold tracking-tighter text-primary drop-shadow-sm mb-4">
          TurismES
        </h1>
        <p className="text-sm font-bold tracking-[0.3em] text-on-surface-variant uppercase opacity-90">
          DESCUBRA SEU LADO CAPIXABA
        </p>
        <div className="mt-6 w-16 h-1 bg-gradient-to-r from-primary to-secondary-container rounded-full opacity-40" />
      </div>
      <div className="absolute bottom-16 left-0 right-0 z-10 flex justify-center px-10">
        <div className="w-full max-w-xs h-1.5 bg-surface-container-highest/40 rounded-full overflow-hidden backdrop-blur-sm">
          <div className="h-full w-2/3 bg-gradient-to-r from-primary via-primary-container to-secondary-container rounded-full shadow-[0_0_12px_rgba(0,94,151,0.4)] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
