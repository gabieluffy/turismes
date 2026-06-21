import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import { DashboardCard } from "@/components/DashboardCard";
import { ChartWrapper, CHART_COLORS } from "@/components/charts/ChartWrapper";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute('/_authenticated/graficos')({
  head: () => ({
    meta: [
      { title: "Gráficos — TurismES" },
      {
        name: "description",
        content:
          "Indicadores e estatísticas sobre os pontos turísticos cadastrados na plataforma TurismES.",
      },
    ],
  }),
  component: GraficosPage,
});

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function GraficosPage() {
  const { 
    graf_favorites, 
    grafico_fvoritos,
    graf_local_municipio,
    grafico_local_municipio,
    graf_categorias,
    grafico_categorias
  } = useAuth();

useEffect(() => {
    grafico_fvoritos()   
    grafico_local_municipio()
    grafico_categorias()
  }, []);

  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      <TopBar />
      <main className="pt-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <button
          onClick={() => navigate({ to: "/perfil" })}
          className="flex items-center gap-1 text-on-surface-variant text-sm mb-4 hover:text-primary transition-colors"
        >
          <Icon name="arrow_back" style={{ fontSize: 18 }} /> Voltar
        </button>

        <header className="mb-8">
          <span className="text-[10px] uppercase font-bold tracking-widest text-tertiary">
            Analítico
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
            Dashboard TurismES
          </h1>
          <p className="text-sm text-on-surface-variant mt-2 max-w-2xl">
            Indicadores e estatísticas sobre os pontos turísticos cadastrados na
            plataforma.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <DashboardCard
            title="Distribuição dos Locais por Categoria"
            description="Quais categorias possuem mais locais cadastrados."
          >
            <ChartWrapper
              loading={!graf_categorias}//categorias.loading}
              //error={categorias.error}
              //onRetry={categorias.refetch}
              empty={!graf_categorias?.length}
              data={[
                {
                  type: "pie",
                  labels: graf_categorias?.map((d) => d.categoria) ?? [],
                  values: graf_categorias?.map((d) => d.quantidade) ?? [],
                  marker: { colors: CHART_COLORS },
                  //textinfo: "label+percent",
                  hole: 0.45,
                },
              ]}
              layout={{
                showlegend: true,
                legend: { orientation: "h", y: -0.15 },
                margin: { t: 16, r: 16, b: 48, l: 16 },
              }}
              height={300}
            />
          </DashboardCard>



          <DashboardCard
            title="Favoritos por Categoria"
            description="Categorias que mais despertam interesse."
          >
            <ChartWrapper
              loading={!graf_favorites}
              empty={!graf_favorites?.length}
              //error={grafico_fvoritos.error}
              //onRetry={grafico_fvoritos.refetch}
              data={[
                {
                  type: "bar",
                  x: graf_favorites?.map((d) => d.categoria) ?? [],
                  y: graf_favorites?.map((d) => d.favoritos) ?? [],
                  marker: { color: "#005e97" },
                  hovertemplate: "%{x}: %{y} favoritos<extra></extra>",
                },
              ]}
              layout={{
                xaxis: { tickangle: -20, automargin: true },
                yaxis: { title: { text: "Favoritos" } },
              }}
              height={300}
            />
          </DashboardCard>

          <DashboardCard
            title="Locais por Município"
            description="Distribuição geográfica dos pontos turísticos."
          >
            <ChartWrapper
              loading={!graf_local_municipio}//municipios.loading}
              //error={municipios.error}
              //onRetry={municipios.refetch}
              empty={!graf_local_municipio?.length}//!municipios.data?.length}
              data={[
                {
                  type: "bar",
                  x: graf_local_municipio?.map((d) => d.cidade) ?? [],
                  y: graf_local_municipio?.map((d) => d.locais) ?? [],
                  marker: { color: "#1b6d24" },
                  hovertemplate: "%{x}: %{y} locais<extra></extra>",
                },
              ]}
              layout={{
                xaxis: { tickangle: -20, automargin: true },
                yaxis: { title: { text: "Locais" } },
              }}
              height={300}
            />
          </DashboardCard>
        </div>

        <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-widest text-center mt-8">
          Dados consumidos do backend Flask • configure <code>VITE_API_URL</code>
        </p>
      </main>
      <BottomNav />
    </div>
  );
}
