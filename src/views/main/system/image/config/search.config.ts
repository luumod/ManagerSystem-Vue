
const searchConfig = {
  pageName: '图片管理',
  formItems: [
    {
      type: 'input',
      prop: 'owner_id',
      label: '所属用户',
      placeholder: '请输入所属用户id',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'image_name',
      label: '图片名称',
      placeholder: '请输入图片名称',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'image_type',
      label: '图片类型',
      placeholder: '请输入图片的类型',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'image_format',
      label: '图片格式',
      placeholder: '请选择图片的格式',
      initialValue: ''
    },
    {
      type: 'select',
      prop: 'image_share',
      label: '共享方式',
      placeholder: '请选择图片的共享方式',
      options: [
        {
          label: '公有',
          value: 1
        },
        {
          label: '私有',
          value: 2
        },
        {
          label: '授权',
          value: 3
        },
      ],
      initialValue: ''
    },
    {
      type: 'select',
      prop: 'image_download',
      label: '下载方式',
      placeholder: '请选择图片的下载方式',
      options: [
        {
          label: '允许',
          value: 1
        },
        {
          label: '禁止',
          value: 2
        },
        {
          label: '授权',
          value: 3
        },
      ],
      initialValue: ''
    },
  ]
};
export default searchConfig;
