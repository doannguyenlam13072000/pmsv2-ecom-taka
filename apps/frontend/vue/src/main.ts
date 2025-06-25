import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";
import { registerGolbalDirective } from "./directives";
import router from "./router";
import { registerGlobalComponent } from "./utils/import";

const app = createApp(App);

registerGlobalComponent(app);
registerGolbalDirective(app);

app.use(router);
app.mount("#app");
