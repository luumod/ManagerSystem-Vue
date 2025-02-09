import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css'; //css重置样式
import './assets/css/index.less'; //npm install less -D
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
