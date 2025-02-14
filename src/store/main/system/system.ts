import {
  checkUserAccount,
  createNewUser,
  deleteUserData,
  getUserListData
} from '@/service/main/system/system';
import { defineStore } from 'pinia';
import type { T_userSystemState, T_queryUserData, T_createUserParams } from './types';
import default_query_condition from './types';

const useSystemStore = defineStore('system', {
  state: (): T_userSystemState => ({
    user_list: [],
    total_count: 0
  }),
  actions: {
    async getUserListAction(queryInfo: T_queryUserData = default_query_condition) {
      const user_list = await getUserListData(queryInfo);
      const { total_records, list } = user_list.data;
      this.user_list = list;
      this.total_count = total_records;
    },
    async deleteUsersAction(id: number, queryInfo: T_queryUserData) {
      //1. 删除数据
      await deleteUserData(id);

      //2. 更新列表
      this.getUserListAction(queryInfo);
    },
    async createNewUserAction(new_user_params: T_createUserParams) {
      await createNewUser(new_user_params)
        .then(() => {
          this.getUserListAction();
        })
        .catch((error) => {
          throw error; //用户已经存在
        });
    },
    async checkUserAccountAction(account: string) {
      await checkUserAccount(account)
        .then(() => {
          return true;
        })
        .catch((error) => {
          throw error; //账号重复
        });
    }
  }
});

export default useSystemStore;
