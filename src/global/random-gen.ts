// 公共字符集
const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// 随机生成工具函数
export const generateRandomMobile = () => {
  // 中国大陆手机号段（2023年最新）
  const prefixes = [
    '130',
    '131',
    '132',
    '133',
    '134',
    '135',
    '136',
    '137',
    '138',
    '139',
    '145',
    '147',
    '149',
    '150',
    '151',
    '152',
    '153',
    '155',
    '156',
    '157',
    '158',
    '159',
    '165',
    '166',
    '167',
    '170',
    '171',
    '172',
    '173',
    '174',
    '175',
    '176',
    '177',
    '178',
    '180',
    '181',
    '182',
    '183',
    '184',
    '185',
    '186',
    '187',
    '188',
    '189',
    '191',
    '198',
    '199'
  ];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
  return `${prefix}${suffix}`;
};

export const generateRandomEmail = () => {
  // 常用邮箱域名
  const domains = [
    'qq.com',
    '163.com',
    'sina.com',
    'gmail.com',
    'outlook.com',
    'hotmail.com',
    'yahoo.com',
    'foxmail.com',
    'icloud.com'
  ];

  // 生成4-10位用户名（允许数字、字母、点号）
  const usernameLength = Math.floor(Math.random() * 7) + 4;
  const username = Array.from({ length: usernameLength }, () => {
    return ALPHANUMERIC[Math.floor(Math.random() * ALPHANUMERIC.length)];
  }).join('');

  return `${username}@${domains[Math.floor(Math.random() * domains.length)]}`;
};

const cryptoRandom = (max: any) => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
};

export const generateRandomAccount = () => {
  const length = Math.floor(Math.random() * 15) + 6; // 6-20位
  return Array.from({ length }, () => ALPHANUMERIC[cryptoRandom(ALPHANUMERIC.length)]).join('');
};

export const generateRandomUsername = (min = 4, max = 12) => {
  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  return Array.from({ length }, () => ALPHANUMERIC[cryptoRandom(ALPHANUMERIC.length)]).join('');
};
