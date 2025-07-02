import { VueQueryPlugin } from "@tanstack/vue-query";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";

// Tailwind css
import "@/assets/tailwind.css";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";

import App from "./App.vue";
// Directives
import { registerGolbalDirective } from "./directives";
// i18n
import { i18n } from "./i18n";
import { vueQueryOptions } from "./lib/vueQuery";
import router from "./router";
// Global component
import { registerGlobalComponent } from "./utils/import";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

registerGlobalComponent(app);
registerGolbalDirective(app);

app.use(i18n);
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.use(VueQueryPlugin, vueQueryOptions);

app.mount("#app");
