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
          <el-form-item label="状态" prop="isEnable">
            <el-select v-model="searchForm.isEnable" placeholder="请选择用户状态">
              <el-option label="任意" value="" />
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="2" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="性别" prop="gender">
            <el-select v-model="searchForm.gender" placeholder="请选择用户性别">
              <el-option label="任意" value="" />
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
              <el-option label="保密" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 重置和搜索按钮-->
    <div class="btns">
      <el-button :icon="Refresh" @click="onClikedReset">重置</el-button>
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
  isEnable: '',
  gender: ''
});

/**
 * 自定义事件：
 * search-click：@search-click="onClickedSearch"
 * reset-click：@reset-click="onClikedRefresh"
 */
const emit = defineEmits(['search-click', 'reset-click']);

//1. 查询信息重置
const formRef = ref<InstanceType<typeof ElForm>>();

/**
 * 重置信息
 * 1.在el-form标签中添加属性ref="formRef"
 * 2.通过ref获取到el-form实例：formRef
 * 3.调用resetFields方法重置表单
 */
function onClikedReset() {
  formRef.value?.resetFields();
  emit('reset-click');
}

function onClickedSearch() {
  emit('search-click', searchForm);
}
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
