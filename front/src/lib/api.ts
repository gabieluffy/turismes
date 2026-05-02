import { auth } from "./auth";

export async function api(
  endpoint: string,
  options: RequestInit = {}
) {

  const token = auth.getToken();

  return fetch(`http://127.0.0.1:8000${endpoint}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",

      ...(token && {
        Authorization: `Bearer ${token}`,
      }),

      ...options.headers,
    },
  });
}