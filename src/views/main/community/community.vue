<template>
  <div class="community">
    <div class="container">
      <template v-for="item in imageList" :key="item.id">
        <div class="card">
          <img :src="item.image_path" alt="Image 1" />
          <h3>{{ item.image_name }}</h3>
          <p>{{ item.image_type }}</p>
          <div class="author-info">
            <span class="author">VCG图片小编</span>
            <span class="views">9826次阅读</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts" name="community">
import { LOGIN_TOKEN } from '@/global/constants';
import { BASE_URL } from '@/service/config';
import useStorageStore from '@/store/storage/storage';
import { localCache } from '@/utils/cache';
import { computed, onMounted } from 'vue';

const storageStore = useStorageStore();

/**
 * 首先从缓存中加载，如果没有或者超时则发送请求获取图片列表
 */
onMounted(() => {
  if (Date.now() - storageStore.lastFetchTime > 300000 || storageStore.image_list.length === 0) {
    storageStore.resetCache().getImageListAction({
      orderBy: 'default',
      orderDirection: ''
    });
  }
});

/**
 * 包装图片列表，把整理好后的数据传递给content-image组件
 */
const imageList = computed(() => {
  const token = localCache.getCache(LOGIN_TOKEN);
  if (!token) {
    console.error('无法获取登录令牌');
    return [];
  }
  //只取前6张图片
  const image_list = storageStore.image_list.slice(0, 99);
  return image_list.map((item) => {
    return {
      ...item,
      image_path: `${BASE_URL}${item.image_path}?token=${token}&timestamp=${Date.now()}`
    };
  });
});
</script>

<style scoped>
.community {
  width: 100%;
  .container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    width: 100%;
  }

  .card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card:hover {
    transform: translateY(-10px);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }

  h3 {
    font-size: 16px;
    color: #333;
    margin: 15px 0 5px;
  }

  p {
    font-size: 14px;
    color: #777;
    margin-bottom: 15px;
  }

  .author-info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #555;
  }

  .author {
    font-weight: bold;
  }

  .views {
    color: #888;
  }
}
</style>
