import { T_pageType } from '@/store/main/system/types';

const createdConfig = {
  pageType: T_pageType.PAGE_IMAGE,
  imageAreaTitle: '上传图片',
  dialogWidth: '65%',
  pageName: '新建图片',
  labelWidth: 100,
  formItems: [
    {
      order: 'first',
      type: 'image',
      prop: 'image_path',
      placeholder: '请上传图片',
      initialValue: ''
    },
    {
      order: 'first',
      type: 'input',
      prop: 'owner_id',
      label: '所有者ID',
      placeholder: '请输入图片所有者id'
    },
    {
      order: 'first',
      type: 'input',
      prop: 'image_name',
      label: '图片名称',
      placeholder: '请输入图片名称',
      initialValue: ''
    },
    {
      order: 'second',
      type: 'input',
      prop: 'image_type',
      label: '图片类型',
      placeholder: '请输入图片类型',
      initialValue: ''
    },
    {
      order: 'second',
      type: 'select',
      prop: 'image_share',
      label: '图片分享',
      placeholder: '请选择图片的分享状态',
      initialValue: 1,
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
      order: 'second',
      type: 'select',
      prop: 'image_download',
      label: '图片下载',
      placeholder: '请选择图片的下载状态',
      initialValue: 1,
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
        }
      ]
    },
    {
      order: 'second',
      type: 'textarea',
      prop: 'description',
      label: '图片描述',
      placeholder: '请输入图片描述',
      initialValue: ''
    }
  ]
};
export default createdConfig;
