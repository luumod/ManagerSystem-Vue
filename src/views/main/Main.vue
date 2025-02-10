<template>
  <div class="main">
    <h2>main:{{ counterStore.counter }} - {{ counterStore.doubleCounter }}</h2>
    <button @click="changeCounter">修改counter</button>
  </div>
</template>

<script setup lang="ts" name="main">
import useCounterStore from '@/store/counter';

const counterStore = useCounterStore();

function changeCounter() {
  counterStore.changeCounterAction(200);
}
</script>

<style scoped>
.main {
  color: red;
}
</style>
