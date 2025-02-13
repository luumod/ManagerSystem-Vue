import { getUserListData } from '@/service/main/system/system';
import { defineStore } from 'pinia';
import type { ISystemState } from './types';

const useStstemStore = defineStore('system', {
  state: (): ISystemState => ({
    user_list: [],
    total_count: 0
  }),
  actions: {
    async getUserListAction() {
      const user_list = await getUserListData();
      const { total_records, list } = user_list.data;
      this.user_list = list;
      this.total_count = total_records;
      console.log(this.user_list);
      console.log(this.total_count);
    }
  }
});

export default useStstemStore;
