import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// Tailwind css
import "@/assets/tailwind.css";

import { createApp } from "vue";

import App from "./App.vue";
// Directives
import { registerGolbalDirective } from "./directives";
// i18n
import { i18n } from "./i18n";
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

app.mount("#app");
