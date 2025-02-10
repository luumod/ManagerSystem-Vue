<template>
  <div class="App">
    <h2>App</h2>
    <RouterLink to="/main">主页</RouterLink>
    <RouterLink to="/login">登录</RouterLink>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts" name="App"></script>

<style scoped>
.App {
  background-color: aquamarine;
  height: 100vh;
  width: 100vw;
}
</style>
