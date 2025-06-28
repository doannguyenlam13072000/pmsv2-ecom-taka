import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: "",
  }),
  actions: {
    signIn() {
      this.token = "token";
    },
    signOut() {
      this.token = "";
    },
  },
  persist: true, // ✅ Persist entire store
});
