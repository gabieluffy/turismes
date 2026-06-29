# Deploy na Vercel

Este projeto usa **TanStack Start** (Vite + React + SSR). Ele já está
configurado para gerar o build no formato esperado pela Vercel.

## Passos

1. Faça push do repositório para o GitHub / GitLab / Bitbucket.
2. No painel da Vercel: **Add New → Project → Import** e selecione o repositório.
3. Na tela de configuração do projeto:
   - **Framework Preset:** `Other` (deixe como está, o `vercel.json` cuida do resto)
   - **Build Command:** `bun run build` (já vem do `vercel.json`)
   - **Install Command:** `bun install` (já vem do `vercel.json`)
   - **Output Directory:** deixe em branco — o Nitro gera `.vercel/output`
     automaticamente e a Vercel detecta sozinha.
4. (Opcional) Em **Environment Variables**, adicione:
   - `VITE_API_URL` → URL do seu backend Flask (ex.: `https://meu-backend.com`).
     Se não definir, o app usa `http://localhost:5000` como fallback e os
     gráficos exibem os dados de exemplo (mock).
5. Clique em **Deploy**. Em ~1–2 minutos o site estará no ar.

## Como funciona

- O `vite.config.ts` passa `nitro: { preset: "vercel" }` para o wrapper da
  Lovable. Fora do sandbox da Lovable, o Nitro gera o output no formato
  Build Output API da Vercel (`.vercel/output/`), que a Vercel publica
  diretamente — sem necessidade de configurar rotas, funções ou
  diretório de assets manualmente.
- O `vercel.json` força a Vercel a usar `bun` para instalar/build, o que
  garante paridade com o ambiente da Lovable.

## Problemas comuns

- **"Command 'bun' not found"**: A Vercel suporta Bun nativamente em
  projetos modernos. Caso apareça esse erro, troque no `vercel.json`:
  ```json
  { "buildCommand": "npm run build", "installCommand": "npm install" }
  ```
- **Página em branco após deploy**: confirme que **Output Directory**
  está vazio no painel da Vercel (não defina `dist/` manualmente — o
  Nitro usa `.vercel/output`).