<template>
  <!-- 图片列表 -->
  <Waterfall ref="waterfall" :list="props.imageList">
    <template #default="{ item, url }">
      <div
        class="group overflow-hidden rounded-lg bg-gray-900 shadow-md transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600"
        @click="handleClick(item)"
      >
        <div class="overflow-hidden">
          <LazyImg
            :url="url"
            title="title"
            :alt="item.name"
            class="cursor-pointer transition-all duration-300 ease-linear group-hover:scale-110"
            @load="imageLoad"
            @error="imageError"
            @success="imageSuccess"
          />
        </div>
      </div>
    </template>
  </Waterfall>
</template>

<script setup lang="ts">
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next';
import 'vue-waterfall-plugin-next/dist/style.css';
import type { ViewCard } from 'vue-waterfall-plugin-next/dist/types/types/waterfall';
import type { T_imageInfo } from '@/store/main/system/types';

const props = defineProps<{
  imageList: { src: string; info: T_imageInfo }[];
}>();



function handleClick(item: ViewCard) {
  console.log(item);
}
function imageLoad() {}
function imageError() {}
function imageSuccess() {}
</script>

<style scoped lang="less"></style>
