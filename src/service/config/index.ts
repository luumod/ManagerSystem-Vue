//export const BASE_URL = 'http://codercba.com:8000';
//export const BASE_URL = 'http://codercba.prod:8000';

//切换环境
//vite默认提供的环境变量
// import.meta.env;
//console.log(import.meta.env);
let BASE_URL = '';
if (import.meta.env.PROD) {
  //生产环境
  BASE_URL = 'http://codercba.prod:8000';
} else {
  //开发环境
  BASE_URL = 'http://codercba.com:8000';
}

//创建.env
console.log(import.meta.env); //可以读取到.env文件中的环境变量

export const TIME_OUT = 10000;
export { BASE_URL };
