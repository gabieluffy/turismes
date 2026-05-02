import { Link } from "@tanstack/react-router";
import { Icon } from "./Icon";

export function TopBar({ avatar = true }: { avatar?: boolean }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/70 backdrop-blur-xl flex justify-between items-center px-6 py-4">
      <Link
        to="/home"
        className="text-xl font-extrabold text-primary tracking-tight font-headline"
      >
        TurismES
      </Link>
      <div className="flex items-center gap-4">
        <Icon
          name="notifications"
          className="text-on-surface-variant hover:opacity-80 cursor-pointer"
        />
        {avatar && (
          <Link
            to="/perfil"
            className="w-8 h-8 rounded-full overflow-hidden bg-surface-variant block"
          >
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp0D_7Hfx278YUy5Lc6_Nw2K7IJX1WZMaCTvm6CQK0H41pQCULo2XGWYBejGPAZruKatNb6o0wxrW4Z9yAWdwBEmCgsP64mOALs65fcEHJ18xCyHM6m7JSwRQMatLwq29RsXOKjHZZk4YkuT6Y_lv7WDhW-SZQQCyqCrtv54lUGB01muM-ebyTdaGY7sGZ6T15NZx59Kk87cy6XYFChuDuyDiGtM8em7st2FBY9seYe-AaMCmdgYSO9Utnm5IqDZuypLcP356DvYaT"
              alt="Perfil"
            />
          </Link>
        )}
      </div>
    </nav>
  );
}
