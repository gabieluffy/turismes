import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute('/esqueci-senha')({
  head: () => ({
    meta: [{ title: "Recuperar Senha — TurismES" }],
  }),
  component: ForgotPasswordPage,
});

type Step =
    | "email"
    | "emailSent"
    | "reset"
    | "done";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { esqueciSenha, validarToken, redefinirSenha } = useAuth();

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setError(null);
      try {
          await esqueciSenha(email);
          setStep("emailSent");
      } catch {
          setError("Não foi possível enviar o e-mail.");
      }
  }
  




  async function submitReset(e: React.FormEvent) {

      e.preventDefault();

      setError(null);

      if (password.length < 6) {

          setError("A senha deve possuir pelo menos 6 caracteres.");

          return;

      }

      if (password !== confirm) {

          setError("As senhas não coincidem.");

          return;

      }

      if (!token) {

          setError("Token inválido.");

          return;

      }

      try {

          await redefinirSenha(token, password);

          setPassword("");

          setConfirm("");

          setStep("done");

      } catch (err: any) {

          setError(err.message);

      }

  }

 useEffect(() => {

    if (!token) {
        return;
    }

    async function validar() {

        try {

            await validarToken(token!);

            setStep("reset");

        } catch {

            setError("Esse link é inválido ou expirou.");

            setStep("email");

        }

    }

    validar();

}, [token]);

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
            Informe seu e-mail e enviaremos um link para redefinir sua senha.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-8 shadow-[0px_12px_32px_rgba(24,28,32,0.06)] border border-white/20">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-on-surface tracking-tight">
              {step === "email" && "Esqueceu sua senha?"}

              {step === "emailSent" && "Confira seu e-mail"}

              {step === "reset" && "Defina uma nova senha"}

              {step === "done" && "Senha alterada!"}
            </h2>
            <p className="text-on-surface-variant mt-1 text-sm">
              {step === "email" &&
              "Informe seu e-mail e enviaremos um link para redefinir sua senha."}

              {step === "emailSent" &&
              "Enviamos um link de recuperação. Clique nele para continuar."}

              {step === "reset" &&
              "Escolha uma nova senha para sua conta."}

              {step === "done" &&
              "Sua senha foi alterada com sucesso."}
            </p>
          </div>

          {error && (
            <div className="mb-4 text-sm bg-error-container/40 text-on-error-container rounded-lg px-4 py-2 border border-error/20">
              {error}
            </div>
          )}

          {step === "email" && (
            <form onSubmit={handleSubmit} className="space-y-6">
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
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold py-4 rounded-full shadow-lg hover:opacity-90 active:scale-95 transition-all"
              >
                Enviar link de recuperação
              </button>
            </form>
          )}

          {step === "emailSent" && (

          <div className="space-y-6">

              <div className="flex justify-center">

                  <Icon
                      name="mark_email_read"
                      className="text-primary"
                      style={{ fontSize: 70 }}
                  />

              </div>

              <div className="text-center">

                  <h3 className="text-xl font-bold">
                      Confira seu e-mail
                  </h3>

                  <p className="text-on-surface-variant mt-2">

                      Enviamos um link de recuperação para

                      <br />

                      <strong>{email}</strong>

                  </p>

              </div>

              <button
                  onClick={() => {
                    setEmail("");
                    setError(null);
                    setStep("email");
                }}
                  className="w-full py-4 rounded-full bg-primary text-on-primary font-bold"
              >
                  Enviar novamente
              </button>

          </div>

          )}          

          {step === "reset" && (
            <form onSubmit={submitReset} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                  Nova senha
                </label>
                <div className="relative">
                  <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
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
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface-variant ml-1">
                  Confirmar nova senha
                </label>
                <div className="relative">
                  <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-xl pl-12 pr-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary shadow-sm"
                    placeholder="••••••••"
                    type={showPwd ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold py-4 rounded-full shadow-lg hover:opacity-90 active:scale-95 transition-all"
              >
                Redefinir senha
              </button>
            </form>
          )}

          {step === "done" && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                  <Icon name="check_circle" filled style={{ fontSize: 40 }} />
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate({ to: "/login" })}
                className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold py-4 rounded-full shadow-lg hover:opacity-90 active:scale-95 transition-all"
              >
                Ir para o login
              </button>
            </div>
          )}
        </div>

        <p className="text-center mt-8 text-on-surface/70 font-medium">
          Lembrou da senha?
          <Link to="/login" className="text-primary font-bold ml-1 hover:underline">
            Voltar ao login
          </Link>
        </p>
      </main>
    </div>
  );
}
