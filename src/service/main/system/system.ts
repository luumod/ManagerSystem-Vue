import hyRequest from '@/service';
import type { T_queryUserData } from '@/store/main/system/types';

export function getUserListData(queryInfo: T_queryUserData) {
  return hyRequest.post({
    url: `/user/list`,
    data: queryInfo
  });
}

export function deleteUserData(accounts: string[]) {
  return hyRequest.post({
    url: `/user/delete`,
    data: {
      lists: accounts
    }
  });
}
