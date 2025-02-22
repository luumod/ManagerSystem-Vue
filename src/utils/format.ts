import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function formatUTC(utcString: string, format: string = 'YYYY/MM/DD HH:mm:ss') {
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format);
  return resultTime;
}

export function getImageSize(image_size: number) {
  return image_size! < 1024 * 1024
    ? (image_size! / 1024).toFixed(0) + ' KB'
    : (image_size! / 1024 / 1024).toFixed(1) + ' MB';
}
