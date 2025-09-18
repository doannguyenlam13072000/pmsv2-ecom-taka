import { type App, defineAsyncComponent } from "vue";

import { LAYOUT } from "@/constants";

export function registerGlobalComponent(app: App<Element>) {
  // Auth layout
  app.component(
    `${LAYOUT.AUTH}-layout`,
    defineAsyncComponent(() => import("@/layouts/AuthLayout.vue")),
  );

  // Public layout
  app.component(
    `${LAYOUT.PUBLIC}-layout`,
    defineAsyncComponent(() => import("@/layouts/PublicLayout.vue")),
  );
}
