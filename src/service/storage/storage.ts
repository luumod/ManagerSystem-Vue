import hyRequest from '@/service';
import type { IFilterImageEmits } from '@/store/storage/types';

export function getImageListData(query_params: IFilterImageEmits) {
  return hyRequest.post({
    url: '/repo/list',
    data: query_params
  });
}
