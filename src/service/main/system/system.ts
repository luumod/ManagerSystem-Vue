import hyRequest from '@/service';
import type {
  T_createUserParams,
  T_queryUserData,
  T_updateUserInfo,
  T_queryImageData,
  T_uploadImageParams
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
export function createNewUser(new_user_params: T_createUserParams, file: File) {
  const formData = new FormData();
  formData.append('upload_avatar', file);
  return hyRequest.post({
    url: `/user/create`,
    params: new_user_params,
    data: formData
  });
}

export function getUserAvatar(avatar_path: string) {
  return hyRequest.get({
    url: `${avatar_path}`
  });
}

export function checkUserAccount(account: string) {
  return hyRequest.get({
    url: `/check/account/${account}`
  });
}

/**
 * 修改用户的基本信息
 * @param id 用户id
 * @param user_params 修改的信息
 * @returns
 */
export function updateUserInfoData(id: number, user_info: T_updateUserInfo) {
  return hyRequest.patch({
    url: `/user/${id}`,
    data: user_info
  });
}

/**
 * 修改用户的头像
 * @param id 用户id
 * @param file 上传的头像文件
 * @returns
 */
export function updateUserAvatarData(id: number, file: File) {
  const formData = new FormData();
  formData.append('upload_avatar', file);
  return hyRequest.post({
    url: `/user/${id}/avatar`,
    data: formData
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

export function createNewImage(image_params: T_uploadImageParams, file: File) {
  const formData = new FormData();
  formData.append('upload_image', file); // 'file' 需与后端解析的字段名匹配

  return hyRequest.post({
    url: `/image/upload`,
    params: image_params,
    data: formData
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
