import { T_pageType } from '@/store/main/system/types';

const modalEditConfig = {
  pageType: T_pageType.PAGE_USER,
  dialogWidth: '50%',
  pageName: '编辑用户信息',
  labelWidth: 100,
  formItems: [
    {
      type: 'avatar',
      prop: 'avatar_path',
      label: '头像',
      placeholder: '请上传头像',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'user_account',
      label: '账号',
      placeholder: '请输入账号',
      initialValue: '',
      read_only: true
    },
    {
      type: 'input',
      prop: 'user_name',
      label: '姓名',
      placeholder: '请输入姓名',
      initialValue: ''
    },
    {
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
      type: 'select',
      prop: 'isEnable',
      label: '状态',
      placeholder: '请选择用户状态',
      options: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '禁用',
          value: 2
        }
      ],
      initialValue: 0
    },
    {
      type: 'input',
      prop: 'mobile',
      label: '电话',
      placeholder: '请输入电话',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      placeholder: '请输入邮箱',
      initialValue: ''
    }
  ]
};
export default modalEditConfig;
