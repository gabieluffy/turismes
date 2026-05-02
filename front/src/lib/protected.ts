import { redirect } from "@tanstack/react-router";

import { auth } from "./auth";

export function requireAuth() {

  if (!auth.isAuthenticated()) {

    throw redirect({
      to: "/login",
    });
  }
}