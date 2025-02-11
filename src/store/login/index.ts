import { accountLoginRequest, getUserInfoById } from '@/service/login';
import type { IUserAccount } from '@/types';
import { defineStore } from 'pinia';
import { localCache } from '@/utils/cache';
import router from '@/router';
import { LOGIN_TOKEN } from '@/global/constants';

const useLoginStore = defineStore('login', {
  state: () => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '', //有则取, 否则为空
    user_info: {} //登录的用户的详细信息
  }),
  actions: {
    //acitons内支持异步操作
    async accountLoginAction(userAccount: IUserAccount) {
      //1. 账号登录，获取token
      const res = await accountLoginRequest(userAccount); //await accountLoginRequest(userAccount);
      console.log(res);
      this.token = res.data.token;
      const id = res.data.id;

      //2. 进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token);

      //3. 获取登录用户的详细信息
      const userInfo = await getUserInfoById(id);
      this.user_info = userInfo.data;
      console.log('!!!!!!!!!!!!!', userInfo);

      //4. 登录成功，页面跳转
      router.push('/main');
    }
  }
});

export default useLoginStore;
