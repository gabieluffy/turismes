import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/auth";

export const Route = createFileRoute('/_authenticated/editar-dados')({
  head: () => ({ meta: [{ title: "Editar Dados — TurismES" }] }),
  component: EditarDadosPage,
});

const STORAGE_KEY = "turismes:user-profile";

type Profile = {
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  bio: string;
};

const DEFAULT: Profile = {
  nome: "",
  email: "",
  telefone: "",
  cidade: "",
  bio: "",
};

function EditarDadosPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile>(DEFAULT);
  const [saved, setSaved] = useState(false);
  const user = auth.getInfoUser();

  const {
    perfilUsuario,
    buscarPerfil,
    editarPerfil
  } = useAuth();

  useEffect(() => {
    if (user) {
      buscarPerfil(user.id);
    }
  }, []);

  useEffect(() => {
    if (perfilUsuario) {
      setProfile({
        nome: perfilUsuario.username,
        email: perfilUsuario.email,
        telefone: perfilUsuario.telefone ?? "",
        cidade: perfilUsuario.cidade ?? "",
        bio: perfilUsuario.bio ?? "",
      });
    }
  }, [perfilUsuario]);


  async function handleSave(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!user) return;

    await editarPerfil(user.id, {
      username: profile.nome,
      email: profile.email,
      telefone: profile.telefone,
      cidade: profile.cidade,
      bio: profile.bio,
    });

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      <TopBar avatar={false} />
      <main className="pt-24 px-6 max-w-md mx-auto">
        <button
          onClick={() => navigate({ to: "/perfil" })}
          className="flex items-center gap-2 text-on-surface-variant mb-4 hover:text-primary transition"
        >
          <Icon name="arrow_back" /> Voltar
        </button>
        <h1 className="text-2xl font-extrabold mb-2">Editar Dados</h1>
        <p className="text-sm text-on-surface-variant mb-6">
          Atualize suas informações pessoais.
        </p>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          {([
            ["nome", "Nome", "text"],
            ["email", "E-mail", "email"],
            ["telefone", "Telefone", "tel"],
            ["cidade", "Cidade", "text"],
          ] as const).map(([key, label, type]) => (
            <label key={key} className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                {label}
              </span>
              <input
                type={type}
                value={profile[key]}
                onChange={(e) => update(key, e.target.value)}
                className="bg-surface-container-low rounded-2xl px-4 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary transition"
              />
            </label>
          ))}

          <label className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Bio
            </span>
            <textarea
              value={profile.bio}
              onChange={(e) => update("bio", e.target.value)}
              rows={4}
              className="bg-surface-container-low rounded-2xl px-4 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary transition resize-none"
            />
          </label>

          <button
            type="submit"
            className="mt-4 py-4 px-6 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <Icon name="save" />
            {saved ? "Salvo!" : "Salvar alterações"}
          </button>
        </form>
      </main>
      <BottomNav />
    </div>
  );
}
