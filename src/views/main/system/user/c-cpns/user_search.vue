<template>
  <div class="user-search">
    <el-form label-width="80px" size="default">
      <el-row :gutter="100">
        <el-col :span="8">
          <el-form-item label="用户名">
            <el-input placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="真实姓名">
            <el-input placeholder="请输入真实姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"
          ><el-form-item label="电话号码">
            <el-input placeholder="请输入电话号码"></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-row :gutter="100">
        <el-col :span="8">
          <el-form-item label="邮箱">
            <el-input placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间">
            <el-date-picker
              type="daterange"
              unlink-panels
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="default"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态">
            <el-select placeholder="请选择用户状态">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="user-search"></script>

<style scoped lang="less">
.user-search {
  background-color: #fff;
  padding: 10px;

  .el-form-item {
    padding: 20px 10px;
    margin-bottom: 0px;
  }
}
</style>
