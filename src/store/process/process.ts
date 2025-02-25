import { defineStore } from 'pinia';
import { ref } from 'vue';

const useProcessStore = defineStore('process', () => {
  const width = ref(0);
  const height = ref(0);

  async function setChangeSizeParams(params: { width: number; height: number }) {
    width.value = params.width;
    height.value = params.height;
  }

  return {
    width,
    height,
    setChangeSizeParams
  };
});

export default useProcessStore;
