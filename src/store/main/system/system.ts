/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  batchDeleteImageData,
  batchDeleteUserData,
  checkUserAccount,
  createImageData,
  createNewUser,
  deleteImageData,
  deleteUserData,
  getImageListData,
  getUserListData,
  updateImageData,
  updateImageInfoData,
  updateUserAvatarData,
  updateUserInfoData
} from '@/service/main/system/system';
import { defineStore } from 'pinia';
import type {
  T_userSystemState,
  T_queryUserData,
  T_createUserParams,
  T_updateUserInfo,
  T_queryImageData,
  T_updateImageInfo,
  T_uploadImageParams
} from './types';
import { default_query_condition, default_queryImage_condition } from './types';
import { localCache } from '@/utils/cache';
import { USER_ID } from '@/global/constants';
import { ElMessage } from 'element-plus';
import { id } from 'element-plus/es/locales.mjs';

const useSystemStore = defineStore('system', {
  state: (): T_userSystemState => ({
    user_list: [],
    total_count: 0,

    image_list_byID: [],
    total_image_count_byID: 0
  }),
  actions: {
    /***
     * 用户列表操作
     */
    async getUserListAction(queryInfo: T_queryUserData = default_query_condition) {
      await getUserListData(queryInfo)
        .then((user_list) => {
          const { total_records, list } = user_list.data;
          this.user_list = list;
          this.total_count = total_records;
        })
        .catch((error) => {
          ElMessage.info(error.message);
        });
    },
    async deleteUsersAction(id: number, queryInfo: T_queryUserData) {
      //1. 删除数据
      await deleteUserData(id).then(() => {
        //2. 更新列表
        this.getUserListAction(queryInfo);
      });
    },
    async batchDeleteUserAction(ids: number[], queryInfo: T_queryUserData) {
      //1. 批量删除
      await batchDeleteUserData(ids).then(() => {
        //2. 更新列表
        this.getUserListAction(queryInfo);
      });
    },
    async createNewUserAction(new_user_params: T_createUserParams, file: File) {
      try {
        await createNewUser(new_user_params, file);
        this.getUserListAction();
      } catch (error) {
        throw error;
      }
    },
    async updateUserInfoAction(
      id: number,
      update_user_params: T_updateUserInfo | any,
      queryInfo: T_queryUserData = default_query_condition
    ) {
      await updateUserInfoData(id, update_user_params).then(() => {
        this.getUserListAction(queryInfo);
      });
    },
    async updateUserAvatarAction(
      id: number,
      queryInfo: T_queryUserData = default_query_condition,
      file: File
    ) {
      await updateUserAvatarData(id, file).then(() => {
        this.getUserListAction(queryInfo);
      });
    },
    async checkUserAccountAction(account: string) {
      await checkUserAccount(account)
        .then(() => {
          return true;
        })
        .catch((error) => {
          throw error; //账号重复
        });
    },

    /***
     * 图片列表操作
     * @param queryInfo 查询条件
     */
    async getImageListAction(queryInfo: T_queryImageData = default_queryImage_condition) {
      await getImageListData(queryInfo).then((image_list_byID) => {
        const { total_records, images } = image_list_byID.data;
        this.image_list_byID = images;
        this.total_image_count_byID = total_records;
      });
    },
    async createNewImageAction(new_image_params: T_uploadImageParams, file: File) {
      try {
        await createImageData(new_image_params, file);
        this.getImageListAction();
      } catch (error) {
        throw error;
      }
    },
    async deleteImageAction(id: number, queryInfo: T_queryImageData) {
      //1. 删除数据
      await deleteImageData(id).then(() => {
        //2. 更新列表
        this.getImageListAction(queryInfo);
      });
    },
    async batchDeleteImageAction(ids: number[], queryInfo: T_queryImageData) {
      //1. 批量删除
      await batchDeleteImageData(ids).then(() => {
        //2. 更新列表
        this.getImageListAction(queryInfo);
      });
    },
    async updateImageInfoAction(
      id: number,
      update_image_params: T_updateImageInfo | any,
      queryInfo: T_queryImageData = default_queryImage_condition
    ) {
      await updateImageInfoData(id, update_image_params).then(() => {
        this.getImageListAction(queryInfo);
      });
    },
    async updateImageAction(
      id: number,
      queryInfo: T_queryImageData = default_queryImage_condition,
      file: File
    ) {
      await updateImageData(id, file).then(() => {
        this.getImageListAction(queryInfo);
      });
    }
  }
});

export default useSystemStore;
