import request from '@/utils/request';

export const getCountry = () => {
  return request({
    url: '/get-country',
    method: 'get'
  });
};
interface give {
  type: number,
  give_id: number
}
interface brow {
  type: number,
  browse_id: number
}
interface scenic {
  city_id: number
}
interface imgList {
  file: any[]
}
interface tochat {
  travel_images: any[],
  travel_name: string,
  travel_sex: number,
  travel_content: string
}
export const Give = (data: give) => {
  return request({
    url: '/insert-give',
    method: 'post',
    data
  });
};
export const getCity = () => {
  return request({
    url: '/get-city',
    method: 'get'
  });
};
export const getScenic = (data: scenic) => {
  return request({
    url: '/get-scenic',
    method: 'post',
    data
  });
};
export const getInsert = (data: brow) => {
  return request({
    url: '/insert-browse',
    method: 'post',
    data
  });
}
export const Uploader = (data: imgList) => {
  return request({
    url: '/insert-uploads',
    method: 'post',
    data
  });
}
export const toChat = (data: tochat) => {
  return request({
    url: '/insert-travel',
    method: 'post',
    data
  });
}
export const queryList = () => {
  return request({
    url: '/select-travel',
    method: 'get',
  });
}