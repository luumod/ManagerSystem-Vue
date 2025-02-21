import hyRequest from '@/service';

export function getImageListData(query_params: { orderBy: string; orderDirection: string }) {
  return hyRequest.post({
    url: '/repo/list',
    data: query_params
  });
}
