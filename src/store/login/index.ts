import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login';
import type { IUserAccount } from '@/types';
import { defineStore } from 'pinia';
import { localCache } from '@/utils/cache';
import router from '@/router';
import { LOGIN_TOKEN } from '@/global/constants';
import { mapMenusToRoutes } from '@/utils/map-menus';

interface ILoginState {
  token: string;
  user_info: any;
  user_menus: any;
}

const USER_INFO = 'user_info';
const USER_MENUS = 'user_menus';

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    //注意箭头函数的返回值类型写法
    //proxy类型
    token: localCache.getCache(LOGIN_TOKEN) ?? '', //有则取, 否则为空
    user_info: localCache.getCache(USER_INFO) ?? {}, //登录的用户的详细信息
    user_menus: localCache.getCache(USER_MENUS) ?? [] //登录用户的菜单
  }),
  actions: {
    //acitons内支持异步操作
    /**
     * 处理登录的操作
     * @param userAccount 用户登录的账号密码 IUserAccount:{user_account,password}
     */
    async accountLoginAction(userAccount: IUserAccount) {
      //1. 账号登录，获取token
      const res = await accountLoginRequest(userAccount); //await accountLoginRequest(userAccount);
      this.token = res.data.token;
      const id = res.data.id;

      //2. token本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token);
      debugger;
      //3. 获取登录用户的详细信息
      const userInfo = await getUserInfoById(id);
      this.user_info = userInfo.data;

      //4. 根据角色请求用户的权限
      const userMenusRes = await getUserMenusByRoleId(this.user_info.id);
      this.user_menus = userMenusRes.data;

      // 个人信息本地缓存
      localCache.setCache(USER_INFO, this.user_info);
      localCache.setCache(USER_MENUS, this.user_menus);

      // 添加动态路由
      const routes = mapMenusToRoutes(this.user_menus);
      routes.forEach((route) => router.addRoute('main', route));

      //end. 登录成功，页面跳转
      router.push('/main');
    },

    /**
     * 加载本地的缓存：用在刷新界面时，重新获取本地缓存数据
     */
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN);
      const user_info = localCache.getCache(USER_INFO);
      const user_menus = localCache.getCache(USER_MENUS);
      if (token && user_info && user_menus) {
        // 个人信息缓存
        this.token = token;
        this.user_info = user_info;
        this.user_menus = user_menus;

        // 动态路由缓存
        const routes = mapMenusToRoutes(user_menus);
        routes.forEach((route) => router.addRoute('main', route));
      }
    }
  }
});

export default useLoginStore;
