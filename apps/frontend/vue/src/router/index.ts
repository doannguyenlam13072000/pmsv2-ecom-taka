import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import { useAuthStore } from "@/stores";

import { authRoutes } from "./auth";
import { publicRoutes } from "./public";

const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  ...authRoutes,
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/NotFound/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// middleware check auth
router.beforeEach((to, _from, next) => {
  // TODO: update later
  const auth = useAuthStore();
  const isAuthenticated = auth.token; // Replace with your real auth check

  const isPublic = to.meta.requiresAuth !== true;

  // Case 1: Trying to access private route without auth
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: "SignIn" });
  }

  // Case 2: Trying to access public route but already authenticated
  if (isPublic && isAuthenticated) {
    return next({ name: "Dashboard" });
  }

  return next();
});

export default router;
