import hyRequest from '..';
import type { IUserAccount } from '@/types';

export function accountLoginRequest(userAccount: IUserAccount) {
  return hyRequest.post({
    url: '/api/login',
    data: userAccount //params
  });
}
