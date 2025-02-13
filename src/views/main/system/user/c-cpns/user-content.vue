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
        <el-table-column align="center" prop="gender" label="性别" width="60" />
        <el-table-column align="center" prop="mobile" label="电话" />
        <el-table-column align="center" prop="email" label="邮箱" />
        <el-table-column align="center" prop="isEnable" label="状态" width="60" />
        <el-table-column align="center" label="操作">
          <el-button type="primary" icon="Edit" link>编辑</el-button>
          <el-button type="danger" icon="Delete" link>删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">分页</div>
  </div>
</template>

<script setup lang="ts" name="user-content">
import useSystemStore from '@/store/main/system/system';
import { storeToRefs } from 'pinia';

//1. 发起action，请求user_list数据
const systemStore = useSystemStore();
systemStore.getUserListAction();

//2. 获取响应式的对象
const { user_list } = storeToRefs(systemStore);
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
</style>
