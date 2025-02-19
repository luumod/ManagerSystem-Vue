/**
 * 创建用户时，所需要的参数
 */
export interface T_createUserParams {
  user_account: string;
  user_name: string;
  gender: number;
  isEnable?: number;
  mobile: string;
  email: string;
  password: string;
}

/**
 * 上传图片时，所需要的参数
 */
export interface T_uploadImageParams {
  image_type: string;
  description: string;
  image_share: number;
  image_download: number;
}

/**
 * 修改用户时，所需要的参数
 */
export interface T_updateUserInfo {
  user_account: string;
  user_name: string;
  mobile: string;
  email: string;
  isEnable: number;
  gender: number;
  avatar_path?: string;
}

/**
 * 修改图片时，所需要的参数
 */
export interface T_updateImageInfo {
  description: string;
  image_download: number;
  image_name: string;
  image_share: number;
  image_type: string;
}

/**
 * 一个用户的全部信息
 */
export interface T_userInfo {
  avatar_path: string;
  create_time: string;
  email: string;
  gender: number;
  has_image_count: number;
  id: number;
  isDeleted: number;
  isEnable: number;
  mobile: string;
  password: string;
  user_account: string;
  user_name: string;
}

/**
 * 一个图片的全部基本信息
 */
export interface T_imageInfo {
  description: string;
  image_ResolutionRatio: string;
  image_download: number;
  image_format: string;
  image_id: number;
  image_name: string;
  image_path: string;
  image_share: number;
  image_size: number;
  image_type: string;
  owner_id: number;
  owner_name: string;
  upload_time: string;
}

/**
 * store中存储的用户列表的信息
 */
export interface T_userSystemState {
  user_list: T_userInfo[];
  total_count: number;

  image_list_byID: T_imageInfo[];
  total_image_count_byID: number;
}

/**
 * 默认查询用户的条件
 */
export interface T_queryCondition {
  page: number;
  pageSize: number;
}

export interface T_queryUserData extends T_queryCondition {
  user_account: string;
  user_name: string;
  mobile: string;
  email: string;
  isEnable: number;
  gender: number;
}

export interface T_queryImageData extends T_queryCondition {
  owner_id?: number;
  image_name: string;
  image_type: string;
  image_format: string;
  image_share: number;
  image_download: number;
}

const default_query_condition: T_queryUserData = {
  page: 1,
  pageSize: 20,
  user_account: '',
  user_name: '',
  mobile: '',
  email: '',
  isEnable: 0,
  gender: 0
};

const default_queryImage_condition: T_queryImageData = {
  page: 1,
  pageSize: 6,
  image_name: '',
  image_type: '',
  image_format: '',
  image_share: 0,
  image_download: 0
};

export { default_query_condition, default_queryImage_condition };

export enum T_pageType {
  PAGE_USER,
  PAGE_IMAGE
}
