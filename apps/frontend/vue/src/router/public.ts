import type { RouteRecordRaw } from "vue-router";

import { defineAsyncComponent } from "vue";

import { LAYOUT } from "@/constants";
import { DELAY, TIMEOUT } from "@/constants/times";

function asyncView(loader: () => Promise<any>) {
  return defineAsyncComponent({
    loader,
    loadingComponent: () => import("@/components/common/Loading/index.vue"),
    errorComponent: () => import("@/components/common/Error/index.vue"),
    delay: DELAY,
    timeout: TIMEOUT,
  });
}

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/sign-in",
    name: "SignIn",
    component: asyncView(() => import("@/pages/SignIn/index.vue")),
    meta: {
      requiresAuth: false,
      layout: LAYOUT.PUBLIC,
    },
    children: [],
  },
];
