import { getUserListData } from '@/service/main/system/system';
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
    }
  }
});

export default useStstemStore;
