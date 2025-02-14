/**
 * 创建用户时，所需要的参数
 */
export interface T_createUserParams {
  user_account: string;
  user_name: string;
  gender: number;
  mobile: string;
  email: string;
  password: string;
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
 * store中存储的用户列表的信息
 */
export interface T_userSystemState {
  user_list: T_userInfo[];
  total_count: number;
}

//查询用户信息时从1页开始
export const PAGE_START = 1;
//每页显示20条数据
export const PAGE_SIZE = 20;

/**
 * 查询用户时可以传入搜索的条件
 */
export interface T_queryUserData {
  page: number;
  pageSize: number;
  user_account: string;
  user_name: string;
  mobile: string;
  email: string;
  isEnable: number;
  gender: number;
}

/**
 * 默认查询用户的条件
 */
const default_query_condition: T_queryUserData = {
  page: PAGE_START,
  pageSize: PAGE_SIZE,
  user_account: '',
  user_name: '',
  mobile: '',
  email: '',
  isEnable: 0,
  gender: 0
};

export default default_query_condition;
