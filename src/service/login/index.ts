import hyRequest from '..';
import type { IUserAccount } from '@/types';

/**
 * 处理用户的登录请求
 * @param userAccount 登录的用户的账号与密码：IUserAccunt = {user_account, password}
 * @returns AxiosPromise<any>
 */
export function accountLoginRequest(userAccount: IUserAccount) {
  return hyRequest.post({
    url: '/api/login',
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
    url: `/api/user/get_one_image?image_id=${id}`
    // headers: { //添加请求时拦截即可
    //   Authorization: localCache.getCache(LOGIN_TOKEN)
    // }
  });
}
