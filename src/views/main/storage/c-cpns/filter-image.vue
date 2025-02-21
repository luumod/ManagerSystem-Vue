<template>
  <div class="filter-image">
    <div>
      <div style="margin-left: 10px; margin-bottom: 10px">
        <el-icon><Sort /></el-icon>
        <span>排序</span>
      </div>
      <div style="display: flex; gap: 10px; margin-bottom: 20px">
        <el-select
          v-model="value"
          placeholder="Select"
          style="width: 240px"
          @change="handleChangeOption(value)"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button :icon="currentIcon" @click="handleChangeState" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="filter-image">
import { ref } from 'vue';

const options = [
  { label: '默认排序', value: 0 },
  { label: '上传时间', value: 1 },
  { label: '图片名称', value: 2 },
  { label: '图片大小', value: 3 }
];

const value = ref(0);
const types = ['default', 'upload_time', 'image_name', 'image_size'];
const directions = ['ASC', 'DESC'];

const current_type = ref(types[0]);
const current_direction = ref(directions[0]);

const icons = ['ArrowUp', 'ArrowDown'];
const currentIcon = ref(icons[0]);

const emit = defineEmits(['changeOrderType', 'changeOrderDirection']);

function handleChangeState() {
  //1. 图标改变
  currentIcon.value = currentIcon.value === icons[0] ? icons[1] : icons[0];

  //2. 排序方向改变
  current_direction.value =
    current_direction.value === directions[0] ? directions[1] : directions[0];

  //3. 发送事件
  emit('changeOrderDirection', {
    orderBy: current_type.value,
    orderDirection: current_direction.value
  });
}

function handleChangeOption(val: number) {
  //1. 排序类型改变
  current_type.value = types[val];
  //2. 发送事件
  emit('changeOrderType', { orderBy: current_type.value, orderDirection: current_direction.value });
}
</script>

<style scoped>
.filter-image {
  display: flex;
}
</style>
