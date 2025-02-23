<!-- eslint-disable vue/require-component-is -->
<template>
  <button class="custom-button" :class="buttonClasses" @click="handleClickButton">
    <span class="icon-wrapper">
      <el-icon size="35"><component :is="props.config.icon" /></el-icon>
    </span>
    <span class="button-text">{{ props.config.desc }}</span>
  </button>
</template>

<script setup lang="ts" name="button">
import { computed, defineProps } from 'vue';

interface IProps {
  config: {
    id: number;
    icon: string;
    desc: string;
    rounded: boolean;
    compact: boolean;
  };
}

// 接收props
const props = defineProps<IProps>();

const emit = defineEmits(['clickButton']);

// 计算按钮的class
const buttonClasses = computed(() => ({
  rounded: props.config.rounded,
  compact: props.config.compact
}));

function handleClickButton() {
  emit('clickButton', props.config.id);
}
</script>

<style scoped lang="less">
.custom-button {
  /* 基础样式 */
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  margin: 0 auto;

  /* 默认状态 */
  color: #666;

  /* 悬停状态 */
  &:hover {
    color: #333;
    background-color: rgba(0, 0, 0, 0.05);
  }

  /* 激活状态 */
  &:active {
    transform: scale(0.98);
  }
}

.icon-wrapper {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-text {
  font-size: 16px;
  white-space: nowrap;
}

/* 可选样式修饰符 */
.rounded {
  border-radius: 8px;
}

.compact {
  padding: 4px 8px;
}
</style>
