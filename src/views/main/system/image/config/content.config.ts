import useSystemStore from '@/store/main/system/system';
import { storeToRefs } from 'pinia';

const systemStore = useSystemStore();
const { image_list_byID, total_image_count_byID } = storeToRefs(systemStore);
const contentConfig = {
  page_name: 'image_list',
  data: {
    list: image_list_byID,
    total_count: total_image_count_byID
  },
  header: {
    title: '图片列表',
    btnTitle: '上传图片'
  },
  propsList: [
    { type: 'selection', width: '50' },

    { type: 'normal', label: '归属者', prop: 'owner_id', width: '100' },

    //显示图片
    { type: 'custom', label: '图片', prop: 'image_path', slotName: 'image_path' },

    { type: 'normal', label: '图片大小', prop: 'image_size', width: '100' },
    { type: 'normal', label: '图片格式', prop: 'image_format', width: '100' },
    { type: 'normal', label: '图片类型', prop: 'image_type', width: '100' },
    { type: 'normal', label: '图片分辨率', prop: 'image_ResolutionRatio', width: '100' },
    { type: 'normal', label: '上传时间', prop: 'upload_time', width: '180' },

    { type: 'operation', label: '操作' }
  ],
  page: {
    page_start: 1,
    page_size: 6,
    page_list: [6, 12, 18]
  }
};

export default contentConfig;
