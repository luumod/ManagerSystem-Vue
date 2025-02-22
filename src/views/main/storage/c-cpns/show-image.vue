<template>
  <el-dialog v-model="dialogVisible" fullscreen style="padding: 10px">
    <div class="flex" style="height: 94vh; gap: 5px">
      <!-- 左侧可滚动区域 -->
      <el-scrollbar class="h-full w-1/5 overflow-y-auto border-none">
        <div class="space-y-4 p-4">
          <!-- 基本信息区域 -->
          <div
            style="
              display: flex;
              flex-direction: column;
              text-align: center;
              border: none;
              gap: 12px;
              margin-bottom: 30px;
            "
          >
            <span style="font-size: 1.8rem; font-weight: bold; margin-bottom: 10px">{{
              current_image_info?.image_name
            }}</span>
            <span style="font-size: 1rem; font-weight: 800; margin-bottom: 10px">{{
              current_image_info?.image_ResolutionRatio
            }}</span>
            <el-button style="margin: 2px 15px">
              <el-icon><Star /></el-icon>添加到喜欢
            </el-button>
          </div>

          <el-collapse
            v-model="activeNames"
            class="space-y-4 border-none"
            style="padding: 5px 10px"
          >
            <!-- 详细信息区域 -->
            <el-collapse-item title="详细信息" name="1" class="rounded border-0 shadow-sm">
              <template #title>
                <span class="font-semibold text-gray-700">详细信息</span>
              </template>

              <dl>
                <dt>类型</dt>
                <dd>{{ current_image_info?.image_type }}</dd>
                <dt>格式</dt>
                <dd>{{ current_image_info?.image_format }}</dd>
                <dt>标签</dt>
                <dd>TODO</dd>
                <dt>尺寸</dt>
                <dd>{{ getImageSize(current_image_info?.image_size!) }}</dd>
                <dt>分享状态</dt>
                <dd>{{ current_image_info?.image_share === 1 ? '公开' : '私有' }}</dd>
                <dt>上传时间</dt>
                <dd>{{ formatUTC(current_image_info?.upload_time!) }}</dd>
              </dl>

              <div class="text-sm">
                <p class="leading-relaxed text-gray-700">{{ current_image_info?.description }}</p>
              </div>
            </el-collapse-item>

            <!-- 归属者信息区域 -->
            <el-collapse-item title="其他属性" name="2" class="rounded border-0 shadow-sm">
              <template #title>
                <span class="font-semibold text-gray-700">归属者信息</span>
              </template>
              <dl>
                <dt>上传者</dt>
                <dd class="showcase-uploader">
                  <a class="avatar avatar-32" href="https://wallhaven.cc/user/Migration"
                    ><img
                      src="//wallhaven.cc/images/user/avatar/32/1631213_f1dfaa59fbe1.jpg"
                      alt="Migration" /></a
                  ><a class="username usergroup-2" href="https://wallhaven.cc/user/Migration"
                    >Migration</a
                  ><br />
                </dd>
                <dt>浏览量</dt>
                <dd>TODO</dd>
                <dt>点赞数</dt>
                <dd>TODO</dd>
                <dt>收藏数</dt>
                <dd>TODO</dd>
                <dt>链接</dt>
                <dd><el-input v-model="preview_image_list[0]" size="small" /></dd>
              </dl>
            </el-collapse-item>

            <!-- 图片工具区域 -->
            <el-collapse-item title="图片工具" name="3" class="rounded border-0 shadow-sm">
              <template #title>
                <span class="font-semibold text-gray-700">图片工具</span>
              </template>

              <div style="margin-bottom: 30px">
                <h3 class="mx-4 mb-2">图片下载</h3>
                <table class="sc-dmRaPn jjPGkh w-full table-fixed">
                  <thead>
                    <tr class="border-b border-t border-gray-100 text-left text-xs uppercase">
                      <th class="w-2/6 py-2 pl-4">名称</th>
                      <th class="w-2/6 py-2">尺寸</th>
                      <th class="w-1/6 py-2">大小</th>
                      <th class="w-1/6 py-2 pr-4">类型</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      tabindex="0"
                      class="cursor-pointer border-b border-gray-100 hover:bg-gray-50 focus:bg-gray-50 dark:hover:bg-[#3c4759] dark:focus:bg-[#3c4759]"
                    >
                      <td class="py-2 pl-4">原图</td>
                      <td class="py-2">{{ current_image_info?.image_ResolutionRatio }}</td>
                      <td class="py-2">{{ getImageSize(current_image_info?.image_size!) }}</td>
                      <td class="py-2 pr-4">{{ current_image_info?.image_format }}</td>
                    </tr>
                    <tr
                      tabindex="0"
                      class="cursor-pointer border-b border-gray-100 hover:bg-gray-50 focus:bg-gray-50 dark:hover:bg-[#3c4759] dark:focus:bg-[#3c4759]"
                    >
                      <td class="py-2 pl-4">压缩图</td>
                      <td class="py-2">TODO</td>
                      <td class="py-2">TODO</td>
                      <td class="py-2 pr-4">TODO</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="flex flex-col items-center justify-center">
                <el-button
                  class="w-2/3"
                  style="margin-bottom: 10px"
                  size="small"
                  @click="handleImageFullScreen"
                  >全屏显示</el-button
                >
                <el-button class="w-2/3" style="margin-bottom: 10px" size="small"
                  >图片加工</el-button
                >
                <el-dropdown class="w-2/3" placement="bottom">
                  <el-button class="w-full" size="small">其他操作 </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>分享图片</el-dropdown-item>
                      <el-dropdown-item>生成链接</el-dropdown-item>
                      <el-dropdown-item>编辑元数据</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-scrollbar>

      <!-- 右侧固定区域 -->
      <div class="h-full w-4/5 overflow-hidden">
        <!-- 显示图片预览的窗口，默认隐藏 -->
        <el-image
          v-show="is_preview"
          ref="image_ref"
          :preview-src-list="preview_image_list"
          @close="is_preview = false"
        >
          <template #error>. </template>
        </el-image>
        <el-image
          class="relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          :src="current_image_info?.image_path"
        ></el-image>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts" name="show-image">
import type { T_imageInfo } from '@/store/main/system/types';
import { formatUTC, getImageSize } from '@/utils/format';
import type { ImageInstance } from 'element-plus';
import { computed, ref } from 'vue';

const current_image_info = ref<T_imageInfo>();
const is_preview = ref(false);
const dialogVisible = ref(false);
const activeNames = ref(['1']);
const image_ref = ref<ImageInstance>();
const preview_image_list = computed(() => [current_image_info.value?.image_path]);

/**
 * 打开全屏显示图片的对话框
 * @param image_info 图片信息
 */
function openFullScreenDialog(image_info: T_imageInfo) {
  dialogVisible.value = true;
  current_image_info.value = image_info;
}

/**
 * 全屏显示图片
 */
function handleImageFullScreen() {
  image_ref.value!.showPreview();
  is_preview.value = true;
}

defineExpose({
  openFullScreenDialog
});
</script>

<style scoped lang="less">
dl {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  unicode-bidi: isolate;

  dt {
    z-index: 100;
    float: left;
    width: 10em;
    text-align: right;
    color: #85aaaf;
  }
  dd {
    z-index: 110;
    margin-left: 10em;
    text-align: left;
    padding-left: 1em;
  }

  .showcase-uploader {
    line-height: 1.3em;
    .avatar {
      box-sizing: content-box;
      position: relative;
      display: inline-block;
      height: 200px;
      width: 200px;
    }

    .avatar-32 {
      display: inline-block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
    }

    img {
      width: auto;
      height: auto;
      max-width: 32px;
      max-height: 32px;
      vertical-align: middle;
    }
  }
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0;
}
</style>
