import { defineStore } from "pinia";

type AuthStore = {
  user: any;
  accessToken: string;
  refeshToken: string;
};

export const useAuthStore = defineStore("auth", {
  state: (): AuthStore => ({
    user: null,
    accessToken: "",
    refeshToken: "",
  }),
  actions: {
    async signIn() {
      this.accessToken = "accessToken";
    },
    signOut() {
      this.user = null;
      this.accessToken = "";
      this.refeshToken = "";
    },
    setAccessToken(token: string) {
      this.accessToken = token;
    },
    setRefresshToken(token: string) {
      this.refeshToken = token;
    },
  },
  getters: {
    getUser: (state): any => state.user,
    getAccessToken: (state): string => state.accessToken,
    getRefreshToken: (state): string => state.refeshToken,
    isAuthenticated: (state): boolean => !!state.accessToken,
  },
  persist: true, // ✅ Persist entire store
});
