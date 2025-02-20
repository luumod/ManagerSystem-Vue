import { T_pageType } from '@/service/main/system/types';

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
      order: 'first',
      type: 'input',
      prop: 'mobile',
      label: '电话',
      placeholder: '请输入电话',
      initialValue: ''
    },
    {
      order: 'first',
      type: 'input',
      prop: 'email',
      label: '邮箱',
      placeholder: '请输入邮箱',
      initialValue: ''
    },

    {
      order: 'second',
      type: 'radio',
      prop: 'isEnable',
      disabled: true,
      label: '状态',
      initialValue: 1,
      options: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '禁用',
          value: 2
        }
      ]
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
      prop: 'password',
      label: '密码',
      placeholder: '默认123456，请在登陆后修改密码',
      initialValue: '',
      read_only: true
    },
    {
      order: 'second',
      type: 'picker',
      prop: 'create_time',
      label: '创建日期',
      placeholder: '默认为当前时间',
      initialValue: new Date()
    }
  ]
};
export default createdConfig;
