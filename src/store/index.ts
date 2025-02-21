import { createPinia } from 'pinia';
import type { App } from 'vue';
import useLoginStore from './login';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
function registerStore(app: App) {
  //1. pinia注册
  app.use(pinia);
  //2. 加载缓存
  const localStore = useLoginStore();
  localStore.loadLocalCacheAction();
}

export default registerStore;
