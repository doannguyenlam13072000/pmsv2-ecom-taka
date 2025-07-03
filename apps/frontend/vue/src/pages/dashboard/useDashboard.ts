import { useAuth } from "@/composables/useAuth";
import { useCounterStore } from "@/stores";

export function useCounter() {
  const counter = useCounterStore();
  const { handleSignOut } = useAuth();

  const increment = () => {
    counter.increment();
  };

  return {
    counter,
    increment,
    handleSignOut,
  };
}
