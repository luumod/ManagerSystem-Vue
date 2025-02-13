<template>
  <div class="user-search">
    <!-- 查询的关键字表单 -->
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="default">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="账号" prop="user_account">
            <el-input v-model="searchForm.user_account" placeholder="请输入账号"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="姓名" prop="user_name">
            <el-input v-model="searchForm.user_name" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"
          ><el-form-item label="电话" prop="mobile">
            <el-input
              v-model="searchForm.mobile"
              placeholder="请输入电话"
            ></el-input> </el-form-item
        ></el-col>

        <el-col :span="8">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="searchForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间" prop="create_time">
            <el-date-picker
              type="daterange"
              unlink-panels
              v-model="searchForm.create_time"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="default"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态" prop="isEnable">
            <el-select v-model="searchForm.isEnable" placeholder="请选择用户状态">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 重置和搜索按钮-->
    <div class="btns">
      <el-button :icon="Refresh" @click="onClikedRefresh">重置</el-button>
      <el-button :icon="Search" type="primary" @click="onClickedSearch">搜索</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="user-search">
import { Search, Refresh } from '@element-plus/icons-vue';
import type { ElForm } from 'element-plus';
import { reactive, ref } from 'vue';

const searchForm = reactive({
  user_account: '',
  user_name: '',
  mobile: '',
  email: '',
  create_time: '',
  isEnable: 1
});

//1. 查询信息重置
const formRef = ref<InstanceType<typeof ElForm>>();

/**
 * 重置信息
 * 1.在el-form标签中添加属性ref="formRef"
 * 2.通过ref获取到el-form实例：formRef
 * 3.调用resetFields方法重置表单
 */
const onClikedRefresh = () => {
  formRef.value?.resetFields();
};

const onClickedSearch = () => {
  console.log('onClickedSearch');
};
</script>

<style scoped lang="less">
.user-search {
  background-color: #fff;
  padding: 10px;

  .el-form-item {
    padding: 20px 10px;
    margin-bottom: 0px;
  }
}

.btns {
  text-align: right;
  padding: 0 50px 1px 0;
}
</style>
