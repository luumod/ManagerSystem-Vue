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
      type: 'select',
      prop: 'image_format',
      label: '图片格式',
      placeholder: '请选择图片的格式',
      options: [
        {
          label: 'jpg',
          value: 'jpg'
        },
        {
          label: 'png',
          value: 'png'
        },
        {
          label: 'jpeg',
          value: 'jpeg'
        },
        {
          label: 'bmp',
          value: 'bmp'
        },
        {
          label: 'other',
          value: 'other'
        }
      ],
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'image_type',
      label: '图片类型',
      placeholder: '请输入图片的类型',
      initialValue: ''
    }
  ]
};
export default searchConfig;
