import axios from "axios";

import { useAuthStore } from "@/stores";

export function getAccessToken(): string | null {
  const store = useAuthStore();
  return store.getAccessToken;
}

export function getRefreshToken(): string | null {
  const store = useAuthStore();
  return store.getRefreshToken;
}

export function saveTokens(accessToken: string, refreshToken: string) {
  const store = useAuthStore();
  const { setAccessToken, setRefresshToken } = store;
  setAccessToken(accessToken);
  setRefresshToken(refreshToken);
}

export function clearTokens() {
  const store = useAuthStore();
  const { signOut } = store;
  signOut();
}

// TODO: function refreshAccess Token
export async function refreshAccessToken(refreshToken: string) {
  const res = await axios.post("https://api.example.com/auth/refresh", {
    refreshToken,
  });

  // 🔐 Customize based on your API response structure
  return {
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  };
}
