import type { RouteRecordRaw } from "vue-router";

import { defineAsyncComponent } from "vue";

import { DELAY, LAYOUT, TIMEOUT } from "@/constants";

function asyncView(loader: () => Promise<any>) {
  return defineAsyncComponent({
    loader,
    loadingComponent: () => import("@/components/common/Loading/index.vue"),
    errorComponent: () => import("@/components/common/Error/index.vue"),
    delay: DELAY,
    timeout: TIMEOUT,
  });
}

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Dashboard",
    component: asyncView(() => import("@/pages/Dashboard/index.vue")),
    meta: {
      requiresAuth: true,
      layout: LAYOUT.AUTH,
    },
    children: [],
  },
];
