import { createApp } from "vue";
import App from "./app.vue";
import Enistry from 'enistrys'
import 'enistrys/es/src/button/style/index.css'

const app = createApp(App);
app.use(Enistry);
app.mount("#app");
