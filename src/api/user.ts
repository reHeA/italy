import request from '@/utils/request';

export const getListAxios = () => {
  return request({
    url: '/board/list',
    method: 'get'
  });
};
