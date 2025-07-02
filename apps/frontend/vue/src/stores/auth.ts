import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: "",
  }),
  actions: {
    async signIn() {
      this.token = "token";
    },
    async signOut() {
      this.token = "";
    },
  },
  persist: true, // ✅ Persist entire store
});
