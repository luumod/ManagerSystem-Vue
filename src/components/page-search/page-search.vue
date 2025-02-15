<template>
  <div class="user-search">
    <!-- 查询的关键字表单 -->
    <el-form
      :model="searchForm"
      ref="formRef"
      :label-width="props.searchConfig.labelWidth ?? '80px'"
    >
      <el-row :gutter="20">
        <template v-for="item in props.searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>

              <template v-if="item.type === 'select'">
                <el-select v-model="searchForm[item.prop]" :placeholder="item.placeholder">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 重置和搜索按钮-->
    <div class="btns">
      <el-button :icon="Refresh" @click="onClikedReset">重置</el-button>
      <el-button :icon="Search" type="primary" @click="onClickedSearch">搜索</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="user-search">
import { Search, Refresh } from '@element-plus/icons-vue';
import type { ElForm } from 'element-plus';
import { reactive, ref } from 'vue';

interface IProps {
  searchConfig: {
    pageName: string;
    labelWidth?: number;
    formItems: any[];
  };
}

const props = defineProps<IProps>();

const initialForm: any = {};
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? '';
}
const searchForm = reactive(initialForm);

/**
 * 自定义事件：
 * search-click：@search-click="onClickedSearch"
 * reset-click：@reset-click="onClikedRefresh"
 */
const emit = defineEmits(['search-click', 'reset-click']);

//1. 查询信息重置
const formRef = ref<InstanceType<typeof ElForm>>();

/**
 * 重置信息
 * 1.在el-form标签中添加属性ref="formRef"
 * 2.通过ref获取到el-form实例：formRef
 * 3.调用resetFields方法重置表单
 */
function onClikedReset() {
  formRef.value?.resetFields();
  emit('reset-click');
}

function onClickedSearch() {
  emit('search-click', searchForm);
}
</script>

<style scoped lang="less">
.user-search {
  background-color: #fff;
  padding: 10px;

  .el-form-item {
    padding: 20px 10px;
    margin-bottom: 0px;
  }
}

.btns {
  text-align: right;
  padding: 0 50px 1px 0;
}
</style>
