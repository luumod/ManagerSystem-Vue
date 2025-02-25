<template>
  <div class="overview">
    <div style="margin-bottom: 50px">
      <el-carousel :interval="2000" type="card" height="300px" autoplay="true">
        <el-carousel-item v-for="item in imageList" :key="item">
          <template #default>
            <el-image :src="item.image_path" fit="scale-down"> </el-image>
          </template>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 动态搜索框 -->
    <div style="margin-bottom: 50px">
      <b-search></b-search>
    </div>

    <div>
      <h1 class="text-center">我们的特色</h1>
    </div>

    <div class="flex items-center justify-center" style="margin-bottom: 50px">
      <div class="container">
        <div class="card">
          <div class="icon">🔄</div>
          <h3>智能图像上传</h3>
          <p>
            提供简单便捷的图像上传功能，支持批量上传、拖拽上传以及自动识别图像格式，确保用户能够快速将图像导入系统。
          </p>
        </div>
        <div class="card">
          <div class="icon">⚡</div>
          <h3>个性化图像管理</h3>
          <p>
            用户可以对上传的图像进行分类、标注和整理，系统自动生成图像缩略图和标签，帮助用户轻松查找和管理图像。
          </p>
        </div>
        <div class="card">
          <div class="icon">📊</div>
          <h3>实时图像预览与编辑</h3>
          <p>
            提供在线图像预览功能，支持基本的图像编辑操作（如裁剪、旋转、调整亮度等），方便用户对图像进行即时修改。
          </p>
        </div>
        <div class="card">
          <div class="icon">🏙️</div>
          <h3>多用户权限管理</h3>
          <p>
            支持不同权限的用户管理功能，管理员可以设置用户的访问权限，确保图像数据的安全性与隐私保护。
          </p>
        </div>
        <div class="card">
          <div class="icon">🌐</div>
          <h3>图像共享与协作</h3>
          <p>
            支持将图像与其他用户共享，提供多种分享方式，包括公开分享和限权限分享，促进团队协作和信息流通。
          </p>
        </div>
        <div class="card">
          <div class="icon">📈</div>
          <h3>图像搜索与筛选</h3>
          <p>
            提供强大的搜索引擎，支持根据图像标签、上传时间、文件类型等多种维度进行快速搜索，帮助用户高效找到需要的图像。
          </p>
        </div>
      </div>
    </div>

    <div class="container-fluid px-4 py-5" id="homeList">
      <div class="row g-4">
        <!-- 单个卡片模板 -->
        <div class="col-12 col-md-6 col-lg-4" style="margin-bottom: 10px">
          <div class="feature-card">
            <a
              href="/diagram/#Uhttps://www.iodraw.com/diagram/templates/basic/flowchart.xml"
              target="_blank"
              class="card-link"
            >
              <div class="card-icon bg-gradient-flow">
                <i class="fas fa-project-diagram"></i>
              </div>
              <div class="card-content">
                <h3 class="card-title">便捷的图像上传与管理</h3>
                <p class="card-description">
                  只需通过简单的拖拽操作即可将图像批量上传至平台。同时，系统支持多种上传方式，包括直接选择文件和通过拖动上传文件夹中的所有图像，确保不同用户需求的满足。<br />
                  每张图像都可以添加标签，用户可以自定义分类，如按主题、日期或其他关键字进行整理，便于快速查找。
                </p>
                <div class="card-hover">
                  <span>上传图片 →</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        <!-- 单个卡片模板 -->
        <div class="col-12 col-md-6 col-lg-4">
          <div class="feature-card">
            <a
              href="/diagram/#Uhttps://www.iodraw.com/diagram/templates/basic/flowchart.xml"
              target="_blank"
              class="card-link"
            >
              <div class="card-icon bg-gradient-flow">
                <i class="fas fa-project-diagram"></i>
              </div>
              <div class="card-content">
                <h3 class="card-title">丰富的图像编辑功能</h3>
                <p class="card-description">
                  本系统提供了一套全面的图像编辑工具，用户可以在上传后直接对图像进行裁剪、旋转、调整亮度、对比度等基本操作。此外，还支持图像滤镜和效果的快速应用，帮助用户快速改善图像质量或实现创意效果。<br />
                  所有编辑操作都支持实时预览，确保用户能够精准调整图像，满足多样化的需求。
                </p>
                <div class="card-hover">
                  <span>上传图片 →</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        <!-- 其他卡片同理复制结构 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="overview">
import { LOGIN_TOKEN } from '@/global/constants';
import { BASE_URL } from '@/service/config';
import useStorageStore from '@/store/storage/storage';
import { localCache } from '@/utils/cache';
import { computed, onMounted } from 'vue';
import bSearch from '@/components/base-cpns/b-search.vue';

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
  const image_list = storageStore.image_list.slice(0, 6);
  return image_list.map((item) => {
    return {
      ...item,
      image_path: `${BASE_URL}${item.image_path}?token=${token}&timestamp=${Date.now()}`
    };
  });
});
</script>

<style scoped lang="less">
.overview {
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 1200px;
    width: 100%;
  }

  .card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 20px;
    transition: transform 0.3s ease-in-out;
  }

  .card:hover {
    transform: translateY(-10px);
  }

  .icon {
    font-size: 40px;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #666;
  }

  //-----------

  .feature-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    height: 100%;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 48px rgba(15, 23, 42, 0.15);
  }

  .card-icon {
    padding: 1.5rem;
    text-align: center;
    transition: transform 0.3s ease;
  }

  .card-icon i {
    font-size: 2.5rem;
    color: white;
  }

  .bg-gradient-flow {
    background: linear-gradient(135deg, #5fc9d5 0%, rgb(11, 129, 233) 100%);
  }

  .bg-gradient-uml {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }

  .card-content {
    padding: 1.5rem;
    position: relative;
  }

  .card-title {
    color: #1e293b;
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  .card-description {
    color: #64748b;
    line-height: 1.6;
    min-height: 72px;
  }

  .card-hover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(99, 102, 241, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card-link:hover .card-hover {
    opacity: 1;
  }

  .card-hover span {
    color: white;
    font-weight: 500;
    transform: translateX(-10px);
    transition: transform 0.3s ease;
  }

  .card-link:hover .card-hover span {
    transform: translateX(0);
  }

  @media (max-width: 768px) {
    .card-icon {
      padding: 1rem;
    }

    .card-content {
      padding: 1rem;
    }
  }
}
</style>
