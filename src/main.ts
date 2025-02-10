import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css'; //css重置样式
import './assets/css/index.less'; //npm install less -D
//import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 全局注册
// import ElementPlus from 'element-plus';
// app.use(ElementPlus);
import router from './router';
import pinia from './store';
import registerIcons from './global/register-icons';

//1. 样式全局引入
//import 'element-plus/dist/index.css';
//2. 针对ElMessage或ELLooading来引入样式
//import 'element-plus/theme-chalk/el-message.css';
//3. vite-plugin-style-import插件自动导入样式

// 局部注册
//import { ElButton } from 'element-plus';
//app.component(ElButton.name, ElButton);

//图标全局注册

// 自动注册
const app = createApp(App);
app.use(registerIcons); //参数自动传递为app
app.use(router);
app.use(pinia);
app.mount('#app');
