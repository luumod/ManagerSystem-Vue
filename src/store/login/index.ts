import { accountLoginRequest } from '@/service/login';
import type { IUserAccount } from '@/types';
import { defineStore } from 'pinia';
import { localCache } from '@/utils/cache';

const LOGIN_TOKEN = 'login/token';

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '', //有则取, 否则为空
    user_name: ''
  }),
  actions: {
    //acitons内支持异步操作
    async accountLoginAction(userAccount: IUserAccount) {
      //1. 账号登录，获取token
      const res = await accountLoginRequest(userAccount); //await accountLoginRequest(userAccount);
      console.log(res);
      if (res.code !== 0) {
        //登录失败
        console.log('登录失败');
        return;
      }
      this.id = res.data.id;
      this.token = res.data.token;
      this.user_name = res.data.user_name;

      //2. 进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token);
    }
  }
});

export default useLoginStore;
