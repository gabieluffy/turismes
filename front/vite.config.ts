// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).

// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Em builds fora do sandbox da Lovable (ex.: Vercel), forçamos o preset "vercel"
// para que o Nitro gere o output em `.vercel/output` que a Vercel reconhece.
// Dentro do sandbox da Lovable o preset Cloudflare continua sendo usado automaticamente.
export default defineConfig({
  nitro: {
    preset: "vercel",
  },
});