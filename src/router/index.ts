import { LOGIN_TOKEN } from '@/global/constants';
import { localCache } from '@/utils/cache';
import { first_menu } from '@/utils/map-menus';
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
      name: 'main',
      component: () => import('@/views/main/Main.vue')
    }
  ]
});

//导航守卫
//to: 跳转到的位置；from：从哪里眺
//返回值决定导航的路径
router.beforeEach((to) => {
  //只有登录成功（token），才能进入到主页
  const token = localCache.getCache(LOGIN_TOKEN);
  if (to.path.startsWith('/main') && !token) {
    return '/login';
  }

  if (to.path === '/main') {
    return first_menu?.url || first_menu?.path || '/login';
  }
});

export default router;
