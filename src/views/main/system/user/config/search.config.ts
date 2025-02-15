const searchConfig = {
  pageName: '用户管理',
  formItems: [
    {
      type: 'input',
      prop: 'user_account',
      label: '账号',
      placeholder: '请输入账号',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'user_name',
      label: '姓名',
      placeholder: '请输入姓名',
      initialValue: ''
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
    },
    {
      type: 'select',
      prop: 'isEnable',
      label: '状态',
      placeholder: '请选择用户状态',
      options: [
        {
          label: '任意',
          value: 0
        },
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
      type: 'select',
      prop: 'gender',
      label: '性别',
      placeholder: '请选择用户性别',
      options: [
        {
          label: '任意',
          value: 0
        },
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
      ],
      initialValue: 0
    }
  ]
};
export default searchConfig;
