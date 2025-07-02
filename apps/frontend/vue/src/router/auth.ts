import type { RouteRecordRaw } from "vue-router";

import { LAYOUT } from "@/constants";

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/pages/Dashboard/Dashboard.vue"),
    meta: {
      requiresAuth: true,
      layout: LAYOUT.AUTH,
    },
    children: [],
  },
  {
    path: "/sample",
    name: "Sample",
    component: () => import("@/pages/Sample/Sample.vue"),
    meta: {
      requiresAuth: true,
      layout: LAYOUT.AUTH,
    },
    children: [],
  },
];
