<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <div class="btns">
        <el-button type="primary" @click="onCreatedNewUser">新建用户</el-button>
        <el-button type="danger" @click="onBatchDeleteUsers">批量删除</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="user_list" border style="width: 100%" @selection-change="onSelectionChange">
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column align="center" prop="user_account" label="账号" width="200" />
        <el-table-column align="center" prop="user_name" label="用户名" />
        <el-table-column align="center" prop="gender" label="性别" width="60">
          <template #default="scope">
            {{ scope.row.gender === 1 ? '男' : scope.row.gender === 2 ? '女' : '未知' }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="mobile" label="电话" width="130" />
        <el-table-column align="center" prop="email" label="邮箱" width="200" />
        <el-table-column align="center" prop="isEnable" label="状态" width="80">
          <!-- 作用域插槽:实现自定义渲染：子组件内部el-table会保存当前行的数据，通过scope.row可以获取当前行的数据 -->
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.isEnable === 1 ? 'primary' : 'danger'"
              @click="onSetEnableUser(scope.row)"
            >
              {{ scope.row.isEnable === 1 ? '启用' : scope.row.isEnable === 2 ? '禁用' : '错误' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button type="primary" icon="Edit" link @click="onEditUser(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" icon="Delete" link @click="onDeleteUser(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_count"
        @size-change="onPageSizeChange"
        @current-change="onCurrentPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="user-content">
import useSystemStore from '@/store/main/system/system';
import default_query_condition, {
  PAGE_SIZE,
  PAGE_START,
  type T_queryUserData,
  type T_userInfo
} from '@/store/main/system/types';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

//保存多选中选中的多条用户数据行
const multipleSelection = ref<T_userInfo[]>([]);

//数据
const currentPage = ref(PAGE_START);
const pageSize = ref(PAGE_SIZE);

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
fetchUserListData();

//2. 获取响应式的对象
const { user_list, total_count } = storeToRefs(systemStore);

/**
 * 选中的多条用户数据行
 * @param val 选中的多条用户数据行
 */
function onSelectionChange(users: T_userInfo[]) {
  multipleSelection.value = users;
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
 * 编辑用户
 * @param item_data 要编辑的用户的数据
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
  if (multipleSelection.value.length === 0) {
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

/**
 * 发送网络请求：删除用户
 * @param id 要删除的用户的id
 * @param queryInfo 同时满足查询条件
 */
function fetchDeleteUser(id: number, queryInfo: T_queryUserData) {
  systemStore.deleteUsersAction(id, queryInfo);
}

/**
 * 发送网络请求：批量删除用户
 * @param ids 要删除的用户的id数组
 * @param queryInfo 同时满足查询条件
 */
function fetchBatchDeleteUsers(ids: number[], queryInfo: T_queryUserData) {
  systemStore.batchDeleteUserAction(ids, queryInfo);
}

/**
 * 发送网络请求：更新用户
 * @param item_data 要更新的用户的数据
 * @param queryInfo 同时满足查询条件
 */
function fetchUpdateUser(item_data: any, queryInfo: T_queryUserData) {
  systemStore.updateUserAction(item_data.id, { isEnable: item_data.isEnable }, queryInfo);
}

defineExpose({ fetchUserListData, fetchDeleteUser, fetchUpdateUser, fetchBatchDeleteUsers });
</script>

<style scoped>
.user-content {
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
