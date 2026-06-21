import { lazy, Suspense, ReactNode } from "react";
import type { Data, Layout, Config } from "plotly.js";

const Plot = lazy(() => import("react-plotly.js"));

interface ChartWrapperProps {
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  empty?: boolean;
  data: Data[];
  layout?: Partial<Layout>;
  config?: Partial<Config>;
  height?: number;
}

const baseLayout: Partial<Layout> = {
  paper_bgcolor: "rgba(0,0,0,0)",
  plot_bgcolor: "rgba(0,0,0,0)",
  font: { family: "Plus Jakarta Sans, sans-serif", color: "#1a1c1e", size: 12 },
  margin: { t: 16, r: 16, b: 48, l: 48 },
  autosize: true,
};

const baseConfig: Partial<Config> = { displayModeBar: false, responsive: true };

function Skeleton({ height }: { height: number }) {
  return (
    <div
      className="w-full rounded-xl bg-surface-container-high/60 animate-pulse"
      style={{ height }}
    />
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="h-full min-h-[260px] grid place-items-center text-center px-4">
      <div>
        <p className="text-sm font-semibold text-error mb-1">Não foi possível carregar</p>
        <p className="text-xs text-on-surface-variant mb-3">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-xs font-bold text-primary hover:underline"
          >
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full min-h-[260px] grid place-items-center">
      <p className="text-xs text-on-surface-variant">Sem dados para exibir.</p>
    </div>
  );
}

export function ChartWrapper({
  loading,
  error,
  onRetry,
  empty,
  data,
  layout,
  config,
  height = 280,
}: ChartWrapperProps) {
  if (loading) return <Skeleton height={height} />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  if (empty) return <EmptyState />;

  return (
    <Suspense fallback={<Skeleton height={height} />}>
      <Plot
        data={data}
        layout={{ ...baseLayout, ...layout }}
        config={{ ...baseConfig, ...config }}
        style={{ width: "100%", height }}
        useResizeHandler
      />
    </Suspense>
  );
}

export const CHART_COLORS = [
  "#005e97",
  "#1b6d24",
  "#884834",
  "#7d5260",
  "#f5a623",
  "#00897b",
  "#5c6bc0",
  "#d81b60",
];
