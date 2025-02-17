import useSystemStore from '@/store/main/system/system';
import { storeToRefs } from 'pinia';

const systemStore = useSystemStore();
const { user_list, total_count } = storeToRefs(systemStore);
const contentConfig = {
  page_name: 'user_list',
  data: {
    list: user_list,
    total_count: total_count
  },
  header: {
    title: '用户列表',
    btnTitle: '新建用户'
  },
  propsList: [
    { type: 'selection', width: '50' },
    { type: 'index', label: '序号', width: '60' },

    { type: 'normal', label: '账号', prop: 'user_account', width: '200' },
    { type: 'normal', label: '用户名', prop: 'user_name' },
    { type: 'normal', label: '电话', prop: 'mobile', width: '130' },
    { type: 'normal', label: '邮箱', prop: 'email', width: '200' },

    { type: 'gender', label: '性别', prop: 'gender', width: '60' },
    { type: 'enable', label: '状态', prop: 'isEnable', width: '80' },
    { type: 'operation', label: '操作' }
  ],
  page: {
    page_start: 1,
    page_size: 20,
    page_list: [10, 20, 30, 40]
  }
};

export default contentConfig;
