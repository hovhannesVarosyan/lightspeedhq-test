import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import antDesign from 'ant-design-vue';
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css';
import '../src/css/styles.css';

const app = createApp(App);

app.use(antDesign);
app.use(createPinia())
app.use(router);

app.mount('#app');

