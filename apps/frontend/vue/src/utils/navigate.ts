import router from "@/router";

export function navigateTo(path: string): void {
  router.push(path).catch((err: { name: string }) => {
    // Ignore NavigationDuplicated errors
    if (err.name !== "NavigationDuplicated") {
      console.error("Navigation error:", err);
    }
  });
}

export function navigateReplace(path: string): void {
  router.replace(path).catch((err: { name: string }) => {
    if (err.name !== "NavigationDuplicated") {
      console.error("Navigation error:", err);
    }
  });
}
