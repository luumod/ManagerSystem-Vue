<template>
  <div class="main-canvas">
    <canvas ref="canvasRef" class="worker-canvas"></canvas>
  </div>
</template>

<script setup lang="ts" name="main-canvas">
import { onMounted, onUnmounted, ref } from 'vue';

//画布实例
const canvasRef = ref<HTMLCanvasElement | null>(null);

//比例：缩放
const currentScale = ref<number>(1);

//偏移：拖拽
const offset = ref({ x: 0, y: 0 });

//鼠标拖拽的位置坐标
const dragStart = ref<{ x: number; y: number } | null>(null);

//图片数据
let imgInstance: HTMLImageElement | null = null;
//图片文件
const currentFile = ref<File | null>(null);

// 容器尺寸
const containerRect = ref<DOMRect>();

onMounted(() => {
  window.addEventListener('resize', handleResize);

  if (!canvasRef.value) return;
  const canvas = canvasRef.value;

  // 获取容器尺寸
  containerRect.value = (canvas.parentElement as HTMLElement).getBoundingClientRect()!;

  // 滚轮事件
  canvas.addEventListener('wheel', handleWheel, { passive: false });

  // 可选：添加拖拽平移功能
  canvas.addEventListener('mousedown', startDrag);
  canvas.addEventListener('mousemove', handleDrag);
  canvas.addEventListener('mouseup', endDrag);
  canvas.addEventListener('mouseleave', endDrag);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);

  if (!canvasRef.value) return;
  const canvas = canvasRef.value;
  canvas.removeEventListener('wheel', handleWheel);
  canvas.removeEventListener('mousedown', startDrag);
  canvas.removeEventListener('mousemove', handleDrag);
  canvas.removeEventListener('mouseup', endDrag);
});

/**
 * 监听窗口大小变化,重绘画布
 */
function handleResize() {
  if (currentFile.value) {
    setCanvas(currentFile.value);
  }
}

/**
 * 鼠标滚轮事件处理：缩放画布中的图片
 * @param e 鼠标滚轮事件
 */
function handleWheel(e: WheelEvent) {
  e.preventDefault();

  /*
  滚轮往下：缩小，负值
  滚轮往上：放大，正值
  */

  //1. 计算当前缩放比例
  const delta = e.deltaY > 0 ? 0.9 : 1.1; // 缩小/放大系数
  const newScale = currentScale.value * delta;
  // 设置缩放范围限制 (0.5x - 5x)
  if (newScale < 0.5 || newScale > 5) {
    return;
  }
  currentScale.value = newScale;

  //2. 获取鼠标在canvas中的坐标
  const rect = canvasRef.value!.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  //3. 计算缩放前后的坐标偏移
  const scaleFactor = newScale / currentScale.value;
  offset.value = {
    x: mouseX - (mouseX - offset.value.x) * scaleFactor,
    y: mouseY - (mouseY - offset.value.y) * scaleFactor
  };

  drawImage();
}

/**
 * 点击开始拖拽
 * @param e 鼠标按下事件
 */
function startDrag(e: MouseEvent) {
  dragStart.value = { x: e.clientX, y: e.clientY };
}

/**
 * 拖拽平移
 * @param e 鼠标移动事件
 */
function handleDrag(e: MouseEvent) {
  if (!dragStart.value) return;

  //计算偏移
  offset.value.x += e.clientX - dragStart.value.x;
  offset.value.y += e.clientY - dragStart.value.y;
  dragStart.value = { x: e.clientX, y: e.clientY };

  drawImage();
}

/**
 * 松开结束拖拽
 */
function endDrag() {
  dragStart.value = null;
}

/**
 * 设置画布：读取传入的图片文件资源，存储到imgInstance中
 * @param file 图片文件
 */
function setCanvas(file: File) {
  const reader = new FileReader();
  reader.onload = (e) => {
    imgInstance = new Image();
    imgInstance.onload = () => {
      resetView();
      drawImage();
    };
    //保存图片数据到imgInstance中: <img>
    imgInstance.src = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

/**
 * 在绘制图片，即调用drawImage()之前，重置缩放比例与偏移，以便一开始就能够把图片放在合适的位置
 */
function resetView() {
  if (!imgInstance || !canvasRef.value) {
    return;
  }

  const canvasRect = canvasRef.value!.getBoundingClientRect();
  const scale = Math.min(
    canvasRect.width / imgInstance.width,
    canvasRect.height / imgInstance.height
  );

  currentScale.value = scale;
  offset.value = { x: 0, y: 0 };
}

/**
 * 绘制画布中的图片
 */
function drawImage() {
  if (!imgInstance || !canvasRef.value) {
    return;
  }
  const canvas = canvasRef.value;

  //main-canvas的窗口尺寸
  const container = canvasRef.value.parentElement as HTMLElement;
  if (!container) {
    return;
  }

  // 减少模糊感
  const dpr = window.devicePixelRatio || 1;
  canvas.width = container.clientWidth * dpr;
  canvas.height = container.clientHeight * dpr;

  // 预处理
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 位置参数
  const scaledWidth = imgInstance.width * currentScale.value;
  const scaledHeight = imgInstance.height * currentScale.value;
  const x = (canvas.width - scaledWidth) / 2 + offset.value.x;
  const y = (canvas.height - scaledHeight) / 2 + offset.value.y;

  ctx.drawImage(imgInstance, x, y, scaledWidth, scaledHeight);
}

defineExpose({
  setCanvas
});
</script>

<style scoped lang="less">
.main-canvas {
  width: 100%;
  height: 100%;
  overflow: hidden;

  background-image: url('../../../../assets/img/bg-canvas.jpg');
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
