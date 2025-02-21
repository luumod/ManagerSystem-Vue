import { getImageListData } from '@/service/storage/storage';
import { defineStore } from 'pinia';
import type { T_useStorageState } from './types';

const useStorageStore = defineStore('storage', {
  state: (): T_useStorageState => ({
    image_list: []
  }),
  actions: {
    async getImageListAction(query_params: { orderBy: string; orderDirection: string }) {
      try {
        const image_list = await getImageListData(query_params);
        const { images } = image_list.data;
        this.image_list = images;
      } catch (err: any) {
        throw err;
      }
    }
  }
});

export default useStorageStore;
