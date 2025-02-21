<template>
  <div>
    <!-- 图片列表 -->
    <div class="image-list-container">
      <div v-for="item in imageList" :key="item.image_id" class="image-card">
        <!-- 图片容器 -->
        <div>
          <el-image
            :src="`${BASE_URL}${item.image_path}?token=${localCache.getCache(LOGIN_TOKEN)}&t=${Date.now()}`"
            loading="lazy"
            fit="cover"
            class="buAXlW"
          >
            <template #error>
              <div class="image-error">加载失败</div>
            </template>
          </el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElImage } from 'element-plus';
import { computed } from 'vue';
import { BASE_URL } from '@/service/config';
import { localCache } from '@/utils/cache';
import { LOGIN_TOKEN } from '@/global/constants';
import useSystemStore from '@/store/main/system/system';

const systemStore = useSystemStore();
systemStore.getImageListAction({
  page: 1,
  pageSize: 99,
  image_name: '',
  image_type: '',
  image_format: '',
  image_share: 0,
  image_download: 0
});

// 响应式数据
const imageList = computed(() => {
  return systemStore.image_list;
});
</script>

<style scoped lang="less">
.image-list-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 16px;

  .image-card {
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    overflow: visible;
    transition: transform 0.2s ease;
    width: 100%; /* 改为响应式宽度 */
    aspect-ratio: 1 / 1; /* 建议添加宽高比 */

    &:hover {
      transform: translateY(-2px);

      .action-buttons {
        opacity: 1;
      }
    }
    .buAXlW {
      height: 100%; /* 改为继承父容器高度 */
      width: 100%; /* 确保宽度填满 */
      object-fit: cover;
      transition: opacity 300ms;
    }
  }
}
</style>
