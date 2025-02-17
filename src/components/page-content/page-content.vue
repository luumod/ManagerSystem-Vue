<template>
  <div class="page-content">
    <div class="header">
      <h3 class="title">{{ props.contentConfig?.header?.title ?? '数据列表' }}</h3>
      <div class="btns">
        <el-button type="primary" @click="onCreatedNewUser">{{
          props.contentConfig?.header?.btnTitle ?? '新建数据'
        }}</el-button>
        <el-button type="danger" @click="onBatchDeleteUsers">批量删除</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="listData" border style="width: 100%" @selection-change="onSelectionChange">
        <template v-for="item in props.contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'enable'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  size="small"
                  :type="scope.row.isEnable === 1 ? 'primary' : 'danger'"
                  @click="onSetEnableUser(scope.row)"
                >
                  {{
                    scope.row.isEnable === 1 ? '启用' : scope.row.isEnable === 2 ? '禁用' : '错误'
                  }}
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'gender'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ scope.row.gender === 1 ? '男' : scope.row.gender === 2 ? '女' : '未知' }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'operation'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button type="primary" icon="Edit" link @click="onEditUser(scope.row)"
                  >编辑</el-button
                >
                <el-button type="danger" icon="Delete" link @click="onDeleteUser(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <!-- 这个template用于default插槽，接收el-table传递过来的一行的数据 -->
              <template v-slot:default="scope">
                <!-- 设置一个具名插槽，并且传递当前行的数据 -->
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item"></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="props.contentConfig.page.page_list"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_count"
        @size-change="onPageSizeChange"
        @current-change="onCurrentPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="page-content">
import useSystemStore from '@/store/main/system/system';
import {
  default_query_condition,
  default_queryImage_condition,
  type T_queryImageData,
  type T_queryUserData
} from '@/store/main/system/types';
import { ElMessage } from 'element-plus';
import { computed, ref, type Ref } from 'vue';

interface IProps {
  contentConfig: {
    page_name: string;
    data: {
      list: Ref<any[]>;
      total_count: Ref<number>;
    };
    header?: {
      title?: string;
      btnTitle?: string;
    };
    propsList: any[];
    page: {
      page_start: number;
      page_size: number;
      page_list: number[];
    };
  };
}

const props = defineProps<IProps>();

//构造响应式数据
const listData = computed(() => props.contentConfig.data.list.value);
const total_count = computed(() => props.contentConfig.data.total_count.value);

//保存多选中选中的多条用户数据行
const multipleSelection = ref<any[]>();

//数据
const currentPage = ref();
const pageSize = ref(props.contentConfig.page.page_size);

const emit = defineEmits([
  'changePage',
  'changePageSize',
  'deleteUser-click',
  'batchDeleteUsers-click',
  'createdNewUser-click',
  'editUser-click',
  'changeEnableUser-click'
]);

//1. 发起action，请求user_list数据
const systemStore = useSystemStore();
if (props.contentConfig.page_name == 'user_list') {
  fetchUserListData();
} else if (props.contentConfig.page_name == 'image_list') {
  fetchImageListData();
}

//2. 获取响应式的对象
//const { user_list, total_count } = storeToRefs(systemStore);

/**
 * 选中的多条用户数据行
 * @param val 选中的多条数据行
 */
function onSelectionChange(data_list: any[]) {
  multipleSelection.value = data_list;
}

/**
 * 页面尺寸变化，为了同时满足用户自定义查询条件，发送信号到外部处理
 */
function onPageSizeChange() {
  emit('changePageSize', pageSize.value);
}

/**
 * 页面页码变化，为了同时满足用户自定义查询条件，发送信号到外部处理
 */
function onCurrentPageChange() {
  emit('changePage', currentPage.value);
}

/**
 * 处理用户的删除，为了同时满足用户自定义查询条件，发送信号到外部处理
 * @param id 要删除的用户的id
 */
function onDeleteUser(id: number) {
  emit('deleteUser-click', id);
}

/**
 * 编辑数据行
 * @param item_data 要编辑的数据行
 */
function onEditUser(item_data: any) {
  emit('editUser-click', item_data);
}

/**
 * 处理用户的启用/禁用
 * @param item_data 要设置状态的用户的数据
 */
function onSetEnableUser(item_data: any) {
  item_data.isEnable = item_data.isEnable === 1 ? 2 : 1;
  emit('changeEnableUser-click', item_data);
}

/**
 * 新建用户
 */
function onCreatedNewUser() {
  emit('createdNewUser-click');
}

/**
 * 批量删除用户
 */
function onBatchDeleteUsers() {
  if (multipleSelection.value == undefined) {
    ElMessage.error('请先勾选要删除的数据行');
  } else {
    emit('batchDeleteUsers-click', multipleSelection.value);
  }
}

/**
 * 发送网络请求：查询满足条件的用户列表
 * @param queryInfo 查询条件，默认为空，1页，20条
 */
function fetchUserListData(queryInfo: T_queryUserData = default_query_condition) {
  systemStore.getUserListAction(queryInfo);
}

function fetchImageListData(queryInfo: T_queryImageData = default_queryImage_condition) {
  systemStore.getImageListAction(queryInfo);
}

/**
 * 发送网络请求：删除用户
 * @param id 要删除的用户的id
 * @param queryInfo 同时满足查询条件
 */
function fetchDeleteUser(id: number, queryInfo: T_queryUserData) {
  systemStore.deleteUsersAction(id, queryInfo);
}

function fetchDeleteImage(id: number, queryInfo: T_queryImageData) {
  systemStore.deleteImageAction(id, queryInfo);
}

/**
 * 发送网络请求：批量删除用户
 * @param ids 要删除的用户的id数组
 * @param queryInfo 同时满足查询条件
 */
function fetchBatchDeleteUsers(ids: number[], queryInfo: T_queryUserData) {
  systemStore.batchDeleteUserAction(ids, queryInfo);
}
function fetchBatchDeleteImages(ids: number[], queryInfo: T_queryImageData) {
  systemStore.batchDeleteImageAction(ids, queryInfo);
}

/**
 * 发送网络请求：更新用户
 * @param item_data 要更新的用户的数据
 * @param queryInfo 同时满足查询条件
 */
function fetchUpdateUser(item_data: any, queryInfo: T_queryUserData) {
  systemStore.updateUserAction(item_data.id, { isEnable: item_data.isEnable }, queryInfo);
}

defineExpose({
  tableData: props.contentConfig.data.list.value,
  fetchUserListData,
  fetchDeleteUser,
  fetchUpdateUser,
  fetchBatchDeleteUsers,

  fetchImageListData,
  fetchDeleteImage,
  fetchBatchDeleteImages
});
</script>

<style scoped>
.page-content {
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
  margin-bottom: 10px;

  .header {
    display: flex;
    justify-content: space-between;
  }

  .title {
    font-size: 22px;
  }
}

.table {
  margin: 4px;

  .el-table_cell {
    padding: 12px 0px;
  }
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
