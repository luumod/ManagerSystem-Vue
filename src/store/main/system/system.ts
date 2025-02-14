import { createNewUser, deleteUserData, getUserListData } from '@/service/main/system/system';
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
      try {
        await createNewUser(new_user_params);
        await this.getUserListAction();
      } catch (error: any) {
        if (error.code === 3002) {
          throw error;
        }
      }
    }
  }
});

export default useSystemStore;
