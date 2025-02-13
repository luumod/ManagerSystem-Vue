import { deleteUserData, getUserListData } from '@/service/main/system/system';
import { defineStore } from 'pinia';
import type { ISystemState, T_queryUserData } from './types';

const useStstemStore = defineStore('system', {
  state: (): ISystemState => ({
    user_list: [],
    total_count: 0
  }),
  actions: {
    async getUserListAction(queryInfo: T_queryUserData) {
      const user_list = await getUserListData(queryInfo);
      const { total_records, list } = user_list.data;
      this.user_list = list;
      this.total_count = total_records;
    },
    async deleteUsersAction(accounts: string[], queryInfo: T_queryUserData) {
      //1. 删除数据
      await deleteUserData(accounts);

      //2. 更新列表
      this.getUserListAction(queryInfo);
    }
  }
});

export default useStstemStore;
