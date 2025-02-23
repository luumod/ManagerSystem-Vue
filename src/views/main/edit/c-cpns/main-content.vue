<template>
  <div class="main-content">
    <canvas ref="canvasRef" class="worker-canvas"></canvas>
  </div>
</template>

<script setup lang="ts" name="main-content">
import { onMounted, onUnmounted, ref } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);

const currentFile = ref<File | null>(null);

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

function handleResize() {
  if (currentFile.value) {
    setCanvas(currentFile.value);
  }
}
function setCanvas(file: File) {
  currentFile.value = file;
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = (e) => {
    console.log(e);
    const img = new Image();
    img.src = e.target?.result as string;
    img.onload = () => {
      if (!canvasRef.value) {
        return;
      }

      // 获取main-content容器尺寸
      const container = canvasRef.value.parentElement;
      if (!container) {
        return;
      }

      // 设置canvas像素尺寸（避免模糊）
      const dpr = window.devicePixelRatio || 1;
      canvasRef.value.width = container.clientWidth * dpr;
      canvasRef.value.height = container.clientHeight * dpr;

      const ctx = canvasRef.value.getContext('2d');
      if (!ctx) {
        return;
      }

      // 清空画布
      ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

      // 计算缩放比例
      const scale = Math.min(
        canvasRef.value.width / img.width,
        canvasRef.value.height / img.height
      );

      // 计算缩放后图片的绘制位置
      const newWidth = img.width * scale;
      const newHeight = img.height * scale;
      const x = (canvasRef.value.width - newWidth) / 2;
      const y = (canvasRef.value.height - newHeight) / 2;

      // 绘制图片
      ctx.drawImage(
        img,
        x,
        y, // 绘制起点
        newWidth, // 绘制宽度
        newHeight // 绘制高度
      );
    };
  };
}

defineExpose({
  setCanvas
});
</script>

<style scoped lang="less">
.main-content {
  width: 100%;
  height: 100%;
  overflow: hidden;

  background-image: url('https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGYtczEyNC1hay00OTE3LTAxXzEta3o3aDk2d3UucG5n.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  .worker-canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
  }
}
</style>
