let isDev = '';
console.log(process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
  //开发
  case 'development':
    isDev = 'dev';
    break;
  //生产
  case 'production':
    isDev = 'pro';
    break;
  //测试
  case 'uat_env':
    isDev = 'uat';
    break;
  //pre
  case 'pre_env':
    isDev = 'pre';
    break;
}
let VUE_APP_gwUrl = ''; //官网地址
let baseUrl = '';
if (isDev === 'dev') {
  VUE_APP_gwUrl = 'https://dev-url.com';
  baseUrl = 'http://rap2api.taobao.org/app/mock/287249';
} else if (isDev === 'uat') {
  VUE_APP_gwUrl = 'https://test.url.com';
  baseUrl = 'https://test.url.com/prod-api';
} else if (isDev === 'pre') {
  VUE_APP_gwUrl = 'https://pre.url.com';
  baseUrl = 'https://pre.url.com/prod-api';
} else if (isDev === 'pro') {
  VUE_APP_gwUrl = 'https://www.url.com/';
  baseUrl = 'https://www.url.com/prod-api';
}
export { VUE_APP_gwUrl, baseUrl };
