import { createPinia } from 'pinia';
import type { App } from 'vue';
import useLoginStore from './login';

const pinia = createPinia();

function registerStore(app: App) {
  //1. pinia注册
  app.use(pinia);
  //2. 加载缓存
  const localStore = useLoginStore();
  localStore.loadLocalCacheAction();
}

export default registerStore;
