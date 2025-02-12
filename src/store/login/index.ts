import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login';
import type { IUserAccount } from '@/types';
import { defineStore } from 'pinia';
import { localCache } from '@/utils/cache';
import router from '@/router';
import { LOGIN_TOKEN } from '@/global/constants';

interface ILoginState {
  token: string;
  user_info: any;
  user_menus: any;
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    //注意箭头函数的返回值类型写法
    //proxy类型
    token: localCache.getCache(LOGIN_TOKEN) ?? '', //有则取, 否则为空
    user_info: {}, //登录的用户的详细信息
    user_menus: [] //登录用户的菜单
  }),
  actions: {
    //acitons内支持异步操作
    async accountLoginAction(userAccount: IUserAccount) {
      //1. 账号登录，获取token
      const res = await accountLoginRequest(userAccount); //await accountLoginRequest(userAccount);
      this.token = res.data.token;
      const id = res.data.id;

      //2. 进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token);

      //3. 获取登录用户的详细信息
      const userInfo = await getUserInfoById(id);
      this.user_info = userInfo.data.images[0];

      //4. 根据角色请求用户的权限
      const userMenusRes = await getUserMenusByRoleId(this.user_info.image_id);
      this.user_menus = userMenusRes.data;
      console.log(userMenusRes);

      //end. 登录成功，页面跳转
      router.push('/main');
    }
  }
});

export default useLoginStore;
