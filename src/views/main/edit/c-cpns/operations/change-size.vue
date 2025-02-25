<template>
  <div class="flex flex-col">
    <label>
      宽度:
      <input
        type="number"
        v-model.number="targetSize.width"
        :min="1"
        :max="originalSize.width * 10"
        @change="handleWidthChange"
      />
    </label>

    <label>
      高度:
      <input
        type="number"
        v-model.number="targetSize.height"
        :min="1"
        :max="originalSize.height * 10"
        @change="handleHeightChange"
      />
    </label>

    <label> <input type="checkbox" v-model="keepRatio" /> 保持比例 </label>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { calculateWidthResize, calculateHeightResize } from '../functions/change-size';
import emitter from '@/utils/emitter';
import type { I_OpeartionProps } from '@/store/process/types';

// 修改响应式逻辑

const props = defineProps<I_OpeartionProps>();

// 使用 watch 同步原始尺寸
const originalSize = reactive({
  width: 0,
  height: 0
});

const targetSize = reactive({
  width: 0,
  height: 0
});

watch(
  () => [props.width, props.height],
  ([newWidth, newHeight]) => {
    if (newWidth && newHeight) {
      originalSize.width = newWidth;
      originalSize.height = newHeight;
      // 初始化目标尺寸（仅在首次设置时）
      if (targetSize.width === 0) targetSize.width = newWidth;
      if (targetSize.height === 0) targetSize.height = newHeight;
    }
  },
  { immediate: true }
);

// 比例锁定逻辑（示例）
const lockAspectRatio = ref(true);
const aspectRatio = computed(() => originalSize.width / originalSize.height);

watch(
  () => targetSize.width,
  (newVal) => {
    if (lockAspectRatio.value) {
      targetSize.height = Math.round(newVal / aspectRatio.value);
    }
  }
);

watch(
  () => targetSize.height,
  (newVal) => {
    if (lockAspectRatio.value) {
      targetSize.width = Math.round(newVal * aspectRatio.value);
    }
  }
);
const keepRatio = ref(true);

// 处理宽度变化
const handleWidthChange = () => {
  if (keepRatio.value) {
    const sizes = calculateWidthResize(
      originalSize.width,
      originalSize.height,
      targetSize.width,
      targetSize.height,
      true
    );
    targetSize.height = Math.round(sizes.height);
  }
  emitter.emit('change-size', { width: targetSize.width, height: targetSize.height });
};

// 处理高度变化
const handleHeightChange = () => {
  if (keepRatio.value) {
    const sizes = calculateHeightResize(
      originalSize.width,
      originalSize.height,
      targetSize.width,
      targetSize.height,
      true
    );
    targetSize.width = Math.round(sizes.width);
  }
  emitter.emit('change-size', { width: targetSize.width, height: targetSize.height });
};
</script>
