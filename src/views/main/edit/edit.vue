<template>
  <div class="edit">
    <h1>图片显示</h1>
    <img ref="imageRef" />
    <canvas ref="canvasRef"></canvas>
    <div>
      <input type="file" @change="handleFileChange" />
    </div>
    <div>
      <el-button @click="showImageInCanvas">点击显示在canvas上</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="edit">
import cv from 'opencv-ts';
import { ref } from 'vue';

const imageRef = ref<HTMLImageElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

function handleFileChange(event: any) {
  const file = event.target as HTMLInputElement;
  if (file.files?.[0]) {
    const url = URL.createObjectURL(file.files[0]);
    if (imageRef.value) {
      imageRef.value.src = url;
    }
  }
}

function showImageInCanvas() {
  if (imageRef.value && canvasRef.value) {
    const mat = cv.imread(imageRef.value);
    if (mat.empty()) {
      return;
    }
    cv.imshow(canvasRef.value, mat);
    mat.delete();
  }
}
</script>

<style scoped lang="less">
.edit {
}
</style>
