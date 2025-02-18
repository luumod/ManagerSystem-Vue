import { T_pageType } from '@/store/main/system/types';

const createdConfig = {
  pageType: T_pageType.PAGE_IMAGE,
  dialogWidth: '75%',
  pageName: '新建图片',
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
      prop: 'owner_id',
      label: '所有者',
      placeholder: '请输入图片所有者id',
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
      label: '图片分享状态',
      placeholder: '请选择图片的分享状态',
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
      label: '图片下载状态',
      placeholder: '请选择图片的下载状态',
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
      type: 'textarea',
      prop: 'description',
      label: '图片描述',
      placeholder: '请输入图片描述',
      initialValue: ''
    }
  ]
};
export default createdConfig;
