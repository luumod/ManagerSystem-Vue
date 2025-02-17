import type PageContent from '@/components/page-content/page-content.vue';
import type { T_queryImageData, T_queryUserData, T_userInfo } from '@/store/main/system/types';
import type UserModalEdit from '@/views/main/system/user/c-cpns/user-modal-edit.vue';
import type UserModal from '@/views/main/system/user/c-cpns/user-modal.vue';
import { ref, type Ref } from 'vue';

/**
 * 页面内容的hooks封装
 * @returns contentRef: 【内容】组件的ref
 * @returns modalEditRef: 【编辑】用户弹窗的ref
 * @returns modalRef: 【新增】用户弹窗的ref
 * @returns conditionRef: 【查询】条件的ref
 * @returns onChangePage: 页数变化
 * @returns onChangePageSize: 页面尺寸变化
 * @returns onClickedDelete: 删除
 * @returns onClickedBatchDelete: 批量删除
 * @returns onClickedChanegeEnableUser: 启用/禁用
 * @returns onClickedEditUser: 编辑
 * @returns onClickedCreatedNewUser: 新增
 */
function usePageContent(conditionRef: Ref<any>) {
  const contentRef = ref<InstanceType<typeof PageContent>>();
  const modalEditRef = ref<InstanceType<typeof UserModalEdit>>();
  const modalRef = ref<InstanceType<typeof UserModal>>();
  
  type FetchListMethods = {
    fetchUserListData: T_queryUserData;
    fetchImageListData: T_queryImageData;
  };
  /**
   * 改变页码会发送请求，按新的页码查询用户列表（可满足查询条件）
   * @param page 页码
   */
  // function onChangePage(page: number) {
  //   conditionRef.value.page = page;
  //   contentRef.value?.fetchUserListData(conditionRef.value);
  // }
  function createPageChanger<K extends keyof FetchListMethods>(config: {
    condRef: Ref<FetchListMethods[K]>;
    fetchMethod: K;
  }) {
    return (page: number) => {
      config.condRef.value.page = page;
      (contentRef.value as any)?.[config.fetchMethod](config.condRef.value); //(contentRef.value as any)?
    };
  }

  /**
   * 改变每页显示条数会发送请求，按新的每页显示条数查询用户列表（可满足查询条件）
   * @param pageSize 每页显示条数
   */
  function createPageSizeChanger<K extends keyof FetchListMethods>(config: {
    condRef: Ref<FetchListMethods[K]>;
    fetchMethod: K;
  }) {
    return (pageSize: number) => {
      config.condRef.value.pageSize = pageSize;
      (contentRef.value as any)?.[config.fetchMethod](config.condRef.value); //(contentRef.value as any)?
    };
  }

  type FetchDeleteMethods = {
    fetchDeleteUser: T_queryUserData;
    fetchDeleteImage: T_queryImageData;
  };

  /**
   * 点击删除按钮会发送请求，删除指定用户（可满足查询条件）
   * @param id 用户id
   */
  function createOnClickedDeleteChanger<K extends keyof FetchDeleteMethods>(config: {
    condRef: Ref<FetchDeleteMethods[K]>;
    fetchMethod: K;
  }) {
    return (id: number) => {
      (contentRef.value as any)?.[config.fetchMethod](id, config.condRef.value); //(contentRef.value as any)?
    };
  }

  type FetchBatchDeleteMethods = {
    fetchBatchDeleteUsers: T_queryUserData;
    fetchBatchDeleteImages: T_queryImageData;
  };
  /**
   * 点击批量删除按钮会发送请求，批量删除指定用户（可满足查询条件）
   * @param user_infos 用户信息数组
   */

  function createOnClickedBatchDeleteChanger<K extends keyof FetchBatchDeleteMethods>(config: {
    condRef: Ref<FetchBatchDeleteMethods[K]>;
    fetchMethod: K;
  }) {
    return (user_infos: T_userInfo[]) => {
      const ids = user_infos.map((item) => item.id);
      (contentRef.value as any)?.[config.fetchMethod](ids, config.condRef.value); //(contentRef.value as any)?
    };
  }

  /**
   * 点击状态图标，会改变用户的状态（启用/禁用）（可满足查询条件）
   * @param item_data 用户的全部信息
   */
  function onClickedChanegeEnableUser(item_data: any) {
    contentRef.value?.fetchUpdateUser(item_data, conditionRef.value);
  }

  /**
   * 点击编辑按钮：显示编辑框，并将用户信息填充到编辑框中（可满足查询条件）
   * @param item_data 用户信息
   */
  function onClickedEditUser(item_data: any) {
    modalEditRef.value?.showUpdateUserDlg(item_data, conditionRef.value);
  }

  /**
   * 点击新增按钮：显示新增用户的弹窗
   */
  function onClickedCreatedNewUser() {
    modalRef.value?.setDlgVisible(true);
  }

  return {
    contentRef,
    modalEditRef,
    modalRef,
    //conditionRef,
    createPageChanger,
    createPageSizeChanger,
    createOnClickedDeleteChanger,
    createOnClickedBatchDeleteChanger,
    onClickedChanegeEnableUser,
    onClickedEditUser,
    onClickedCreatedNewUser
  };
}

export default usePageContent;
