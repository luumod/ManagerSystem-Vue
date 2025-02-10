import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css'; //css重置样式
import './assets/css/index.less'; //npm install less -D
// 全局注册
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
// app.use(ElementPlus);
import router from './router';
import pinia from './store';

// 局部注册
//import { ElButton } from 'element-plus';
//app.component(ElButton.name, ElButton);

// 自动注册
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');
