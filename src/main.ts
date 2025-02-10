import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css'; //css重置样式
import './assets/css/index.less'; //npm install less -D
// import ElementPlus from 'element-plus'; //全局注册
// import 'element-plus/dist/index.css';
// app.use(ElementPlus);
import router from './router';
import pinia from './store';

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');
