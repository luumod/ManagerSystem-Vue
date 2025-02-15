import type PageContent from '@/components/page-content/page-content.vue';
import type { T_queryUserData, T_userInfo } from '@/store/main/system/types';
import default_query_condition from '@/store/main/system/types';
import type UserModalEdit from '@/views/main/system/user/c-cpns/user-modal-edit.vue';
import type UserModal from '@/views/main/system/user/c-cpns/user-modal.vue';
import { ref } from 'vue';

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
function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>();
  const modalEditRef = ref<InstanceType<typeof UserModalEdit>>();
  const modalRef = ref<InstanceType<typeof UserModal>>();
  const conditionRef = ref<T_queryUserData>({ ...default_query_condition });
  /**
   * 改变页码会发送请求，按新的页码查询用户列表（可满足查询条件）
   * @param page 页码
   */
  function onChangePage(page: number) {
    conditionRef.value.page = page;
    contentRef.value?.fetchUserListData(conditionRef.value);
  }

  /**
   * 改变每页显示条数会发送请求，按新的每页显示条数查询用户列表（可满足查询条件）
   * @param pageSize 每页显示条数
   */
  function onChangePageSize(pageSize: number) {
    conditionRef.value.pageSize = pageSize;
    contentRef.value?.fetchUserListData(conditionRef.value);
  }

  /**
   * 点击删除按钮会发送请求，删除指定用户（可满足查询条件）
   * @param id 用户id
   */
  function onClickedDelete(id: number) {
    contentRef.value?.fetchDeleteUser(id, conditionRef.value);
  }

  /**
   * 点击批量删除按钮会发送请求，批量删除指定用户（可满足查询条件）
   * @param user_infos 用户信息数组
   */
  function onClickedBatchDelete(user_infos: T_userInfo[]) {
    const ids = user_infos.map((item) => item.id); //获取删除用户的id
    contentRef.value?.fetchBatchDeleteUsers(ids, conditionRef.value);
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
    conditionRef,
    onChangePage,
    onChangePageSize,
    onClickedDelete,
    onClickedBatchDelete,
    onClickedChanegeEnableUser,
    onClickedEditUser,
    onClickedCreatedNewUser
  };
}

export default usePageContent;
