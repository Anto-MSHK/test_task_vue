import { createApp } from "vue";
import VueAxios from "vue-axios";
import App from "./App.vue";
import { $api } from "./https";

const app = createApp(App);
app.use(VueAxios, $api);
app.mount("#app");
