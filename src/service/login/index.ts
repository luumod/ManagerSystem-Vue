import hyRequest from '..';
import type { IUserAccount } from '@/types';

/**
 * 处理用户的登录请求
 * @param userAccount 登录的用户的账号与密码：IUserAccunt = {user_account, password}
 * @returns AxiosPromise<any>
 */
export function accountLoginRequest(userAccount: IUserAccount) {
  return hyRequest.post({
    url: `/login`,
    data: userAccount //params
  });
}

/**
 * 根据id获取单个用户的信息
 * @param id 登录的用户id
 * @returns AxiosPromise<any>
 */
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/user/${id}`
  });
}

export function getUserMenusByRoleId(roleId: number) {
  return hyRequest.get({
    url: `/role/${roleId}/menu`
  });
}
