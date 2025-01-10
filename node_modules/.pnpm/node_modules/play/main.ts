import { createApp } from "vue";
import App from "./app.vue";
import easyest from "@enistry/components";
const app = createApp(App);
app.use(easyest);
app.mount("#app");
