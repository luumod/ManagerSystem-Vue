<template>
  <div v-loading="v_loading" style="min-height: 100%; width: 100%">
    <Waterfall
      ref="waterfall"
      :list="props.image_list"
      :row-key="options.rowKey"
      :gutter="options.gutter"
      :has-around-gutter="options.hasAroundGutter"
      :width="options.width"
      :breakpoints="options.breakpoints"
      :img-selector="options.imgSelector"
      :background-color="options.backgroundColor"
      :animation-effect="options.animationEffect"
      :animation-duration="options.animationDuration"
      :animation-delay="options.animationDelay"
      :animation-cancel="options.animationCancel"
      :lazyload="options.lazyload"
      :load-props="options.loadProps"
      :align="options.align"
      @afterRender="afterRender"
    >
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
              class="cursor-pointer transition-all duration-300 ease-linear group-hover:scale-105"
              @load="imageLoad"
              @error="imageError"
              @success="imageSuccess"
            />
          </div>
          <div class="border-t border-t-gray-800 px-4 pb-4 pt-2">
            <h2 class="pb-4 text-gray-50 group-hover:text-yellow-300">
              {{ item.name }}
            </h2>
          </div>
        </div>
      </template>
    </Waterfall>
  </div>
</template>

<script setup lang="ts">
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next';
import 'vue-waterfall-plugin-next/dist/style.css';
import type { ViewCard } from 'vue-waterfall-plugin-next/dist/types/types/waterfall';
import type { T_imageInfo } from '@/store/main/system/types';
import { reactive, ref } from 'vue';
import loading from '@/assets/img/loading.png';
import error from '@/assets/img/error.png';

const props = defineProps<{
  image_list: T_imageInfo[];
}>();

const waterfall = ref(null);
const v_loading = ref(true);

const emit = defineEmits(['clickCard']);

const options = reactive({
  // 唯一key值
  rowKey: 'image_list.image_id',
  // 卡片之间的间隙
  gutter: 12,
  // 是否有周围的gutter
  hasAroundGutter: true,
  // 卡片在PC上的宽度
  width: 230,
  // 自定义行显示个数，主要用于对移动端的适配
  breakpoints: {
    1200: {
      // 当屏幕宽度小于等于1200
      rowPerView: 4
    },
    800: {
      // 当屏幕宽度小于等于800
      rowPerView: 3
    },
    500: {
      // 当屏幕宽度小于等于500
      rowPerView: 2
    }
  },
  // 动画效果
  animationEffect: 'animate__fadeInUp',
  // 动画时间
  animationDuration: 800,
  // 动画延迟
  animationDelay: 300,
  animationCancel: false,
  // 背景色
  backgroundColor: 'white',
  // imgSelector
  imgSelector: 'image_path',
  // 加载配置
  loadProps: {
    loading,
    error,
    ratioCalculator: (width: number, height: number) => {
      // 我设置了最小宽高比
      const minRatio = 1 / 1;
      const maxRatio = 1 / 1;
      // 获取当前图片的比例
      const curRatio = width / height;
      // 如果当前图片比列不在此范围内，我们取最小或者最大值
      if (curRatio < minRatio) {
        return minRatio;
      } else if (curRatio > maxRatio) {
        return maxRatio;
      } else {
        return curRatio;
      }
    }
  },
  // 是否懒加载
  lazyload: true,
  align: 'center'
});

function afterRender() {
  v_loading.value = false;
}

function handleClick(item: ViewCard) {
  emit('clickCard', item);
}
function imageLoad() {}
function imageError() {}
function imageSuccess() {}
</script>

<style scoped lang="less">
.lazy__img[lazy='loading'] {
  padding: 5em 0;
  width: 48px;
}

.lazy__img[lazy='loaded'] {
  width: 100%;
}

.lazy__img[lazy='error'] {
  padding: 5em 0;
  width: 48px;
}
</style>
