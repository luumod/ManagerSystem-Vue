import { accountLoginRequest } from '@/service/login';
import { defineStore } from 'pinia';

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: '',
    user_name: ''
  }),
  actions: {
    //acitons内支持异步操作
    async accountLoginAction(userAccount: any) {
      const res = await accountLoginRequest(userAccount); //await accountLoginRequest(userAccount);
      console.log(res);
      this.id = res.data.id;
      this.token = res.data.token;
      this.user_name = res.data.user_name;
    }
  }
});

export default useLoginStore;
