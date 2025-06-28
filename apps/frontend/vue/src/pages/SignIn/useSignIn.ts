import { useAuth } from "@/composables/useAuth";

export function useSignIn() {
  const { handleSignIn } = useAuth();
  return {
    handleSignIn,
  };
}
