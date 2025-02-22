import {
  batchDeleteImageData,
  batchDeleteUserData,
  checkUserAccount,
  createImageData,
  createNewUser,
  deleteImageData,
  deleteUserData,
  getImageListData,
  getUserIdList,
  getUserListData,
  updateImageData,
  updateImageInfoData,
  updateUserAvatarData,
  updateUserInfoData
} from '@/service/main/system/system';
import { defineStore } from 'pinia';
import type {
  T_queryUserData,
  T_createUserParams,
  T_updateUserInfo,
  T_queryImageData,
  T_updateImageInfo,
  T_uploadImageParams
} from './types';
import {
  default_query_condition,
  default_queryImage_condition,
  type T_imageInfo,
  type T_userInfo
} from './types';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const useSystemStore = defineStore(
  'system',
  () => {
    const user_list = ref<T_userInfo[]>([]);
    const total_count = ref(0);
    const lastFetchUserTime = ref(0);

    const image_list = ref<T_imageInfo[]>([]);
    const total_image_count = ref(0);
    const lastFetchImageTime = ref(0);

    const store = useSystemStore();

    /**
     * 清除缓存，可链式后接一个请求操作
     */
    function resetCacheUser() {
      user_list.value = [];
      total_count.value = 0;
      lastFetchUserTime.value = 0;

      return store;
    }

    function resetCacheImage() {
      image_list.value = [];
      total_image_count.value = 0;
      lastFetchImageTime.value = 0;

      return store;
    }

    /**
     * 检查是否有缓存
     */
    function cacheUser() {
      return (
        Date.now() - lastFetchUserTime.value < 300000 &&
        user_list.value.length > 0 &&
        total_count.value > 0
      );
    }

    function cacheImage() {
      return (
        Date.now() - lastFetchImageTime.value < 300000 &&
        image_list.value.length > 0 &&
        total_image_count.value > 0
      );
    }

    /**
     * 查询用户列表
     * @param queryInfo 查询条件
     */
    async function getUserListAction(queryInfo: T_queryUserData = default_query_condition) {
      try {
        const users = await getUserListData(queryInfo);
        const { total_records, list } = users.data;
        user_list.value = list;
        total_count.value = total_records;
        lastFetchUserTime.value = Date.now();
      } catch (error: any) {
        console.error('获取用户列表时发生错误:', error);
        ElMessage.error(error.message);
      }
    }

    /**
     * 删除指定id的用户
     * @param id 用户id
     * @param queryInfo 查询条件
     */
    async function deleteUsersAction(
      id: number,
      queryInfo: T_queryUserData = default_query_condition
    ) {
      try {
        // 1. 删除数据
        await deleteUserData(id);
        // 2. 更新列表
        await getUserListAction(queryInfo);
      } catch (error: any) {
        console.error('删除用户时发生错误:', error);
        ElMessage.error(error.message);
      }
    }

    /**
     * 批量删除用户
     * @param ids 给定的删除的id集合
     * @param queryInfo 查询条件
     */
    async function batchDeleteUserAction(
      ids: number[],
      queryInfo: T_queryUserData = default_query_condition
    ) {
      try {
        // 批量删除用户数据
        await batchDeleteUserData(ids);
        // 更新用户列表
        await getUserListAction(queryInfo);
      } catch (error: any) {
        console.error('批量删除用户时发生错误:', error);
        ElMessage.error(error.message);
      }
    }

    /**
     * 创建一个新的用户
     * @param new_user_params 新用户的基本信息
     * @param file 新用户的头像文件
     */
    async function createNewUserAction(new_user_params: T_createUserParams, file: File) {
      try {
        await createNewUser(new_user_params, file);
        await getUserListAction(); // 确保更新用户列表等待完成
      } catch (error: any) {
        console.error('创建新用户时发生错误:', error); // 增加错误日志
        throw error;
      }
    }

    /**
     * 修改用户的基本信息
     * @param id 用户id
     * @param update_user_params 更新的用户信息
     * @param queryInfo 查询条件
     */
    async function updateUserInfoAction(
      id: number,
      update_user_params: T_updateUserInfo | { isEnable: number },
      queryInfo: T_queryUserData = default_query_condition
    ) {
      try {
        await updateUserInfoData(id, update_user_params);
        await getUserListAction(queryInfo);
      } catch (error: any) {
        console.error('更新用户基本信息时发生错误:', error);
        ElMessage.error(error.message);
      }
    }

    /**
     * 修改用户的头像
     * @param id 用户id
     * @param queryInfo 查询条件
     * @param file 新的头像文件
     */
    async function updateUserAvatarAction(
      id: number,
      queryInfo: T_queryUserData = default_query_condition,
      file: File
    ) {
      try {
        await updateUserAvatarData(id, file);
        await getUserListAction(queryInfo);
      } catch (error: any) {
        console.error('更新用户头像时发生错误:', error);
        ElMessage.error(error.message);
      }
    }

    /**
     * 检查用户账号是否存在
     * @param account 用户账号
     */
    async function checkUserAccountAction(account: string) {
      try {
        await checkUserAccount(account);
        return true;
      } catch (error: any) {
        console.error('检查用户账号时发生错误:', error);
        throw error;
      }
    }

    async function queryUserIdList() {
      try {
        const ids = await getUserIdList();
        return ids.data.ids ?? [];
      } catch (error: any) {
        console.error('返回用户ids时发生错误:', error);
        throw error;
      }
    }

    /***
     * 图片列表操作
     * @param queryInfo 查询条件
     */
    async function getImageListAction(queryInfo: T_queryImageData = default_queryImage_condition) {
      try {
        const lists = await getImageListData(queryInfo);
        const { total_records, images } = lists.data;
        image_list.value = images;
        total_image_count.value = total_records;
        lastFetchImageTime.value = Date.now();
      } catch (error: any) {
        console.error('获取图片列表时发生错误:', error);
        ElMessage.error(error.message);
      }
    }

    /**
     * 上传新的图片
     * @param new_image_params 图片的基本信息
     * @param file 图片文件
     */
    async function createNewImageAction(new_image_params: T_uploadImageParams, file: File) {
      try {
        await createImageData(new_image_params, file);
        await getImageListAction(); // 使用await确保更新列表等待完成
      } catch (error: any) {
        console.error('创建新图片时发生错误:', error);
        throw error;
      }
    }

    /**
     * 删除指定的图片
     * @param id 图片id
     * @param queryInfo 查询条件
     */
    async function deleteImageAction(id: number, queryInfo: T_queryImageData) {
      try {
        //1. 删除数据
        await deleteImageData(id);
        //2. 更新列表
        await getImageListAction(queryInfo);
      } catch (error: any) {
        console.error('删除图片时发生错误:', error);
        ElMessage.error(error.message);
      }
    }

    /**
     * 批量删除图片
     * @param ids 要删除的图片id集合
     * @param queryInfo 查询条件
     */
    async function batchDeleteImageAction(ids: number[], queryInfo: T_queryImageData) {
      try {
        //1. 批量删除
        await batchDeleteImageData(ids);
        //2. 更新列表
        await getImageListAction(queryInfo);
      } catch (error: any) {
        console.error('批量删除图片时发生错误:', error);
        ElMessage.error(error.message);
      }
    }

    /**
     * 更新图片基本信息
     * @param id 图片id
     * @param update_image_params 更新后的图片信息
     * @param queryInfo 查询条件
     */
    async function updateImageInfoAction(
      id: number,
      update_image_params: T_updateImageInfo | any,
      queryInfo: T_queryImageData = default_queryImage_condition
    ) {
      try {
        await updateImageInfoData(id, update_image_params);
        await getImageListAction(queryInfo);
      } catch (error: any) {
        console.error('更新图片信息时发生错误:', error);
        ElMessage.error(error.message);
      }
    }

    /**
     * 更新图片数据文件
     * @param id 图片id
     * @param file 新的图片文件
     * @param queryInfo 查询条件
     */
    async function updateImageAction(
      id: number,
      file: File,
      queryInfo: T_queryImageData = default_queryImage_condition
    ) {
      try {
        await updateImageData(id, file);
        await getImageListAction(queryInfo);
      } catch (error: any) {
        console.error('更新图片时发生错误:', error);
        ElMessage.error(error.message);
      }
    }

    return {
      user_list,
      total_count,
      image_list,
      total_image_count,
      cacheUser,
      cacheImage,
      resetCacheUser,
      resetCacheImage,

      getUserListAction,
      deleteUsersAction,
      batchDeleteUserAction,
      createNewUserAction,
      updateUserInfoAction,
      updateUserAvatarAction,
      checkUserAccountAction,
      queryUserIdList,

      getImageListAction,
      createNewImageAction,
      deleteImageAction,
      batchDeleteImageAction,
      updateImageInfoAction,
      updateImageAction
    };
  },
  {
    persist: {
      pick: [
        'user_list',
        'total_count',
        'lastFetchUserTime',
        'image_list',
        'total_image_count',
        'lastFetchImageTime'
      ],
      storage: localStorage
    }
  }
);

export default useSystemStore;
