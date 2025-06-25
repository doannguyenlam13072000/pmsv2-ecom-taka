import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createApp } from "vue";

// Tailwind css
import "@/assets/tailwind.css";

import App from "./App.vue";
// Directives
import { registerGolbalDirective } from "./directives";
import router from "./router";
// Global component
import { registerGlobalComponent } from "./utils/import";

const app = createApp(App);

registerGlobalComponent(app);
registerGolbalDirective(app);

app.use(router);
app.use(ElementPlus);

app.mount("#app");
