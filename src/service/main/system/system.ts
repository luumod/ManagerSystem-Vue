import hyRequest from '@/service';
import type { T_queryUserData } from '@/store/main/system/types';

/**
 * 根据自定义查询条件，查询所有用户列表
 * @param queryInfo 查询条件
 * @returns Promise<any>
 */
export function getUserListData(queryInfo: T_queryUserData) {
  return hyRequest.post({
    url: `/user/list`,
    data: queryInfo
  });
}

export function deleteUserData(id: number) {
  return hyRequest.delete({
    url: `/user/${id}`
  });
}
