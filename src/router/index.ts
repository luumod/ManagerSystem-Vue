import { LOGIN_TOKEN } from '@/global/constants';
import { localCache } from '@/utils/cache';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/:pathMath(.*)',
      component: () => import('@/views/not-found/NotFound.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/main/Main.vue')
    }
  ]
});

//导航守卫
//to: 跳转到的位置；from：从哪里眺
//返回值决定导航的路径
router.beforeEach((to, from) => {

  //只有登录成功（token），才能进入到主页
  const token = localCache.getCache(LOGIN_TOKEN);
  if (to.path === '/main' && !token) {
    return '/login';
  }
});

export default router;
