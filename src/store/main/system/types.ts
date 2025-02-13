export interface IUserInfo {
  email: string;
  gender: number;
  id: number;
  isEnable: number;
  mobile: string;
  user_account: string;
  user_name: string;
}

export interface ISystemState {
  user_list: IUserInfo[];
  total_count: number;
}

//查询用户信息时从1页开始
export const PAGE_START = 1;
//每页显示20条数据
export const PAGE_SIZE = 20;
export const DEFAULT_GENDER = 3;
export const DEFAULT_ISENABLE = 2;

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
  isEnable: DEFAULT_ISENABLE,
  gender: DEFAULT_GENDER
};

export default default_query_condition;
