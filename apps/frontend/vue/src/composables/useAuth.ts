import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores";

export function useAuth() {
  const router = useRouter();
  const authStore = useAuthStore();

  const handleSignIn = async () => {
    await authStore.signIn();
    router.push({ name: "Dashboard" });
  };

  const handleSignOut = async () => {
    await authStore.signOut();
    router.push({ name: "SignIn" });
  };

  return {
    handleSignIn,
    handleSignOut,
  };
}
