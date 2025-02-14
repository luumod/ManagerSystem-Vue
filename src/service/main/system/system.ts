import hyRequest from '@/service';
import type { T_createUserParams, T_queryUserData } from '@/store/main/system/types';

/**
 * 根据自定义查询条件，查询所有用户列表
 * @param queryInfo 查询条件
 * @returns Promise<any>
 * @error 保证不会抛出错误
 */
export function getUserListData(queryInfo: T_queryUserData) {
  return hyRequest.post({
    url: `/user/list`,
    data: queryInfo
  });
}

/**
 * 删除一个用户
 * @param id 要删除的用户id
 * @returns Promise<any>
 * @error 保证不会抛出错误
 */
export function deleteUserData(id: number) {
  return hyRequest.delete({
    url: `/user/${id}`
  });
}

/**
 * 创建一个新的用户
 * @param new_user_params 新用户信息
 * @returns Promise<any>
 * @error 【会抛出错误】：用户已经存在
 */
export function createNewUser(new_user_params: T_createUserParams) {
  return hyRequest.post({
    url: `/user/create`,
    data: new_user_params
  });
}
