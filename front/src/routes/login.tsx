import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth"

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Entrar — TurismES" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
      
      navigate({ to: "/home" });

    } catch (error) {
      console.error(error);
    }  finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center p-4 relative">
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <img
          className="w-full h-full object-cover scale-110 blur-md brightness-90"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0LzJNZyUjwWkfN_hjLtAOjBz68USnFQpQW-vsynlQ9TX_VuvHDf1yAVIoHwoFOl1SnWn5Q9FTunezEhMd2LpGifkONR3yk4EGi__GK3-NturEkSUaDoOxMZ6nUhutxtqOqTjWKwxSCVxbXkAjja3Q_bMl_YRh2gFd-3M8SSrrjAK518i_xCcO6EI2PSnZiF27jP3bnzWoQCcr6alm8_ftALcfRpr6y2BJdaKViCFzkupWAQ0aqYtKJI7IlinDYnXJT6R8oWEvew3T"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-on-surface/20" />
      </div>

      <main className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tighter text-primary mb-2">
            TurismES
          </h1>
          <p className="text-on-surface-variant font-medium text-sm tracking-wide uppercase">
            Explore o Espírito Santo
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-8 shadow-[0px_12px_32px_rgba(24,28,32,0.06)] border border-white/20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-on-surface tracking-tight">
              Bem-vindo de volta
            </h2>
            <p className="text-on-surface-variant mt-1">
              Sentimos sua falta! Entre para continuar sua jornada.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                E-mail
              </label>
              <div className="relative">
                <Icon
                  name="mail"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                />
                <input
                  className="w-full bg-surface-container-lowest border-none rounded-xl pl-12 pr-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary shadow-sm"
                  placeholder="seu@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold text-on-surface-variant">
                  Senha
                </label>
                <Link to="/esqueci-senha" className="text-xs font-bold text-primary hover:underline">
                  Esqueceu?
                </Link>
              </div>
              <div className="relative">
                <Icon
                  name="lock"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                />
                <input
                  className="w-full bg-surface-container-lowest border-none rounded-xl pl-12 pr-12 py-3.5 text-on-surface focus:ring-2 focus:ring-primary shadow-sm"
                  placeholder="••••••••"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant"
                >
                  <Icon name={showPwd ? "visibility_off" : "visibility"} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold py-4 rounded-full shadow-lg hover:opacity-90 active:scale-95 transition-all"
              disabled={loading}
            >
            {loading ? "Entrando..." : "Entrar na Conta"}
            </button>
            
          </form>

        </div>

        <p className="text-center mt-8 text-on-surface/70 font-medium">
          Não tem uma conta?
          <Link to="/register" className="text-primary font-bold ml-1 hover:underline">
            Criar conta agora
          </Link>
        </p>
      </main>
    </div>
  )};

