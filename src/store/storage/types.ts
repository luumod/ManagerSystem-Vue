import type { T_imageInfo } from '../main/system/types';

export interface T_useStorageState {
  image_list: T_imageInfo[];
  lastFetchTime: number;
}

export interface IFilterImageEmits {
  orderBy: string;
  orderDirection: string;
}
