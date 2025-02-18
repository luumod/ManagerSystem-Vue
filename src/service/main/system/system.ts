import hyRequest from '@/service';
import type {
  T_createUserParams,
  T_queryUserData,
  T_updateUserInfo,
  T_queryImageData,
  T_updateImageInfo
} from '@/store/main/system/types';

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

export function batchDeleteUserData(ids: number[]) {
  return hyRequest.delete({
    url: `/users`,
    data: { lists: ids }
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

export function checkUserAccount(account: string) {
  return hyRequest.get({
    url: `/check/account/${account}`
  });
}

export function updateUserData(id: number, user_params: T_updateUserInfo) {
  return hyRequest.patch({
    url: `/user/${id}`,
    data: user_params
  });
}

//图片相关接口
export function getImageListByIdData(owner_id: string, queryInfo: T_queryImageData) {
  return hyRequest.post({
    url: `/image/list/${owner_id}`,
    data: queryInfo
  });
}

export function getImageListData(queryInfo: T_queryImageData) {
  return hyRequest.post({
    url: `/image/list`,
    data: queryInfo
  });
}

export function uploadImageListByIdData(owner_id: string, queryInfo: T_queryImageData) {
  return hyRequest.post({
    url: `/image/list/${owner_id}`,
    data: queryInfo
  });
}

export function deleteImageData(id: number) {
  return hyRequest.delete({
    url: `/image/${id}`
  });
}

export function batchDeleteImageData(ids: number[]) {
  return hyRequest.delete({
    url: `/images`,
    data: { lists: ids }
  });
}

export function updateImageData(id: number, image_params: T_updateImageInfo) {
  return hyRequest.patch({
    url: `/image/${id}`,
    data: image_params
  });
}
