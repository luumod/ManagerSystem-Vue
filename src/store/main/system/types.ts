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

export interface IQueryUserListParams {
  page: number;
  page_size: number;
}
