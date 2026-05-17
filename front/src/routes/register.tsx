import { createFileRoute, Link, useNavigate  } from '@tanstack/react-router'
import { Icon } from "@/components/Icon";
import { useState } from "react";
import { useAuth } from '@/hooks/useAuth';

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Criar conta — TurismES" },
      { name: "description", content: "Crie sua conta no TurismES e comece a explorar o Espírito Santo." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }
    try {
        
        await register(email, password, name);
        
        navigate({ to: "/login" });
    } catch (error) {
        console.error(error)
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
            Crie sua conta
          </p>
        </div>
        <div className="glass-panel rounded-2xl p-8 shadow-[0px_12px_32px_rgba(24,28,32,0.06)] border border-white/20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-on-surface tracking-tight">
              Bem-vindo ao TurismES
            </h2>
            <p className="text-on-surface-variant mt-1">
              Cadastre-se para começar sua jornada capixaba.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                Nome
              </label>
              <div className="relative">
                <Icon name="person" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  className="w-full bg-surface-container-lowest border-none rounded-xl pl-12 pr-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary shadow-sm"
                  placeholder="Seu nome"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                E-mail
              </label>
              <div className="relative">
                <Icon name="mail" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
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
              <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                Senha
              </label>
              <div className="relative">
                <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  className="w-full bg-surface-container-lowest border-none rounded-xl pl-12 pr-12 py-3.5 text-on-surface focus:ring-2 focus:ring-primary shadow-sm"
                  placeholder="Mínimo 6 caracteres"
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
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                Confirmar senha
              </label>
              <div className="relative">
                <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  className="w-full bg-surface-container-lowest border-none rounded-xl pl-12 pr-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary shadow-sm"
                  placeholder="Repita sua senha"
                  type={showPwd ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold py-4 rounded-full shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              Criar Conta
            </button>
          </form>
        </div>
        <p className="text-center mt-8 text-on-surface/70 font-medium">
          Já tem uma conta?
          <Link to="/login" className="text-primary font-bold ml-1 hover:underline">
            Entrar
          </Link>
        </p>
      </main>
    </div>
  );
}