<template>
  <div class="login-phone">
    <el-form label-width="60px">
      <el-form-item label="手机号">
        <el-input v-model="phone" placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input/>
          <el-button class="getCode-btn" type="primary">获取验证码</el-button>
        </div>

      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="login-phone">
import { ref } from 'vue'

const phone = ref('')
</script>

<style scoped lang="less">
.verify-code{
  display: flex;
  .getCode-btn{
  margin-left: 10px;
}
}

</style>
