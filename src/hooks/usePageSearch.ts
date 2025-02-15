import type { T_queryUserData } from '@/store/main/system/types';
import default_query_condition from '@/store/main/system/types';
import { type Ref } from 'vue';

/**
 * 页面搜索条件hooks封装
 * @param contentRef 页面内容实例对象
 * @param conditionRef 查询条件对象
 * @returns onClickedSearch: 查询
 * @returns onClickedReset: 重置
 */
function usePageSearch(contentRef: any, conditionRef: Ref<T_queryUserData>) {
  /**
   * 点击查询按钮会发送请求，按用户自定义搜索条件查询用户列表
   * @param formData 用户搜索条件
   */
  function onClickedSearch(formData: T_queryUserData) {
    //在content实例对象中调用fetchUserListData方法
    conditionRef.value = { ...formData };
    contentRef.value?.fetchUserListData(formData);
  }

  /**
   * 点击重置按钮会发送请求，重置搜索条件，查询所有用户列表
   */
  function onClickedReset() {
    conditionRef.value = { ...default_query_condition };
    contentRef.value?.fetchUserListData();
  }

  return {
    onClickedSearch,
    onClickedReset
  };
}

export default usePageSearch;
