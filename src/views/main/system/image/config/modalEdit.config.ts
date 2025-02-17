const modalEditConfig = {
  dialogWidth: '75%',
  pageName: '编辑图片信息',
  labelWidth: 100,
  formItems: [
    {
      type: 'image',
      prop: 'image_path',
      label: '图片',
      placeholder: '请上传图片',
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
      placeholder: '请输入图片类型',
      initialValue: ''
    },
    {
      type: 'select',
      prop: 'image_share',
      label: '分享状态',
      placeholder: '请选择图片分享状态',
      options: [
        {
          label: '公开',
          value: 1
        },
        {
          label: '私有',
          value: 2
        },
        {
          label: '授权',
          value: 3
        }
      ]
    },
    {
      type: 'select',
      prop: 'image_download',
      label: '图片下载',
      placeholder: '请选择图片下载状态',
      options: [
        {
          label: '允许',
          value: 1
        },
        {
          label: '禁用',
          value: 2
        },
        {
          label: '授权',
          value: 3
        }
      ],
      initialValue: 0
    },
    {
      type: 'textarea',
      prop: 'description',
      label: '图片描述',
      placeholder: '请输入图片描述',
      initialValue: ''
    }
  ]
};
export default modalEditConfig;
