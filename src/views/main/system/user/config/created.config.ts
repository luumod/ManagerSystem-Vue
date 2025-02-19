import { T_pageType } from '@/store/main/system/types';

const createdConfig = {
  pageType: T_pageType.PAGE_USER,
  dialogWidth: '50%',
  pageName: '新建用户',
  labelWidth: 100,
  formItems: [
    {
      order: 'first',
      type: 'avatar',
      prop: 'avatar_path',
      placeholder: '请上传头像',
      initialValue: ''
    },
    {
      order: 'first',
      type: 'input',
      prop: 'user_account',
      label: '账号',
      placeholder: '请输入账号',
      initialValue: ''
    },
    {
      order: 'first',
      type: 'input',
      prop: 'user_name',
      label: '姓名',
      placeholder: '请输入姓名',
      initialValue: ''
    },
    {
      order: 'second',
      type: 'input',
      prop: 'password',
      label: '密码',
      placeholder: '登陆后修改密码',
      initialValue: '',
      read_only: true
    },
    {
      order: 'second',
      type: 'select',
      prop: 'gender',
      label: '性别',
      placeholder: '请选择用户性别',
      options: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 2
        },
        {
          label: '保密',
          value: 3
        }
      ]
    },
    {
      order: 'second',
      type: 'input',
      prop: 'mobile',
      label: '电话',
      placeholder: '请输入电话',
      initialValue: ''
    },
    {
      order: 'second',
      type: 'input',
      prop: 'email',
      label: '邮箱',
      placeholder: '请输入邮箱',
      initialValue: ''
    }
  ]
};
export default createdConfig;
