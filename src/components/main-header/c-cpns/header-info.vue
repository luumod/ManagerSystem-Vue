<template>
  <div class="header-info">
    <div class="operation">
      <!-- 通知 聊天 搜索 -->
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <div class="info">
      <!-- 个人信息 -->
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="30"
            src="https://th.bing.com/th/id/R.41921164a5125add470627e30d1286cc?rik=FzPBS2DwEt5Dfw&pid=ImgRaw&r=0"
          />
          <span class="name">Yuleo</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="onExitLoginClick">
              <el-icon><CircleClose /></el-icon>
              退出系统
            </el-dropdown-item>

            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              个人空间
            </el-dropdown-item>

            <el-dropdown-item>
              <el-icon><Lock /></el-icon>
              修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts" name="header-info">
import { LOGIN_TOKEN } from '@/global/constants';
import router from '@/router';
import { localCache } from '@/utils/cache';

function onExitLoginClick() {
  localCache.removeCache(LOGIN_TOKEN);
  router.push('/login');
}
</script>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .name {
    margin-left: 5px;
  }
}

.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
