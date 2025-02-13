import hyRequest from '@/service';

export function getUserListData() {
  return hyRequest.get({
    url: '/api/user/list'
  });
}
