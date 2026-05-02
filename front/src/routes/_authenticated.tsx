import {
  Outlet,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";

import { auth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated")({

  beforeLoad: () => {

    if (!auth.isAuthenticated()) {

      throw redirect({
        to: "/login",
      });
    }
  },

  component: ProtectedLayout,
});

function ProtectedLayout() {
  return <Outlet />;
}