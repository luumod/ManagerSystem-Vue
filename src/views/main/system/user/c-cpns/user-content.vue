<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="user_list" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column align="center" prop="user_account" label="账号" />
        <el-table-column align="center" prop="user_name" label="用户名" width="100" />
        <el-table-column align="center" prop="gender" label="性别" width="60">
          <template #default="scope">
            {{ scope.row.gender === 1 ? '男' : scope.row.gender === 2 ? '女' : '未知' }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="mobile" label="电话" />
        <el-table-column align="center" prop="email" label="邮箱" />
        <el-table-column align="center" prop="isEnable" label="状态" width="80">
          <!-- 作用域插槽:实现自定义渲染：子组件内部el-table会保存当前行的数据，通过scope.row可以获取当前行的数据 -->
          <template #default="scope">
            <el-button size="small" :type="scope.row.isEnable === 1 ? 'primary' : 'danger'">
              {{ scope.row.isEnable === 1 ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <el-button type="primary" icon="Edit" link>编辑</el-button>
          <el-button type="danger" icon="Delete" link>删除</el-button>
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
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

//数据
const currentPage = ref(1);
const pageSize = ref(10);

//1. 发起action，请求user_list数据
const systemStore = useSystemStore();
fetchUserListData();

//2. 获取响应式的对象
const { user_list, total_count } = storeToRefs(systemStore);

//3.1 页面的尺寸变化
function onPageSizeChange() {
  fetchUserListData();
}

//3.2 页数变化
function onCurrentPageChange() {
  fetchUserListData();
}

/**
 * 发送网络请求
 */
function fetchUserListData() {
  systemStore.getUserListAction({ page: currentPage.value, page_size: pageSize.value });
}
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
