import hyRequest from '@/service';
import type { IQueryUserListParams } from '@/store/main/system/types';

export function getUserListData(queryInfo: IQueryUserListParams) {
  return hyRequest.get({
    url: `/api/user/list?page=${queryInfo.page}&pageSize=${queryInfo.page_size}`
  });
}
