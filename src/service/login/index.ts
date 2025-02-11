import hyRequest from '..';

export function accountLoginRequest(userAccount: any) {
  return hyRequest.post({
    url: '/api/login',
    data: userAccount //params
  });
}
