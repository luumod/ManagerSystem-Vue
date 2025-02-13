<template>
  <div class="user-modal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <p>6666666</p>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="user-modal">
import { ref } from 'vue';

const dialogVisible = ref(false);

function setDlgVisible(val: boolean) {
  console.log('val: ', val);
  dialogVisible.value = val;
}

defineExpose({ setDlgVisible });
</script>

<style scoped>
.user-modal {
  color: red;
}
</style>
