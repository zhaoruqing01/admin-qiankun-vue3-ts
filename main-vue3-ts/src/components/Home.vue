<template>
  <div class="home">HOME</div>
</template>
<script setup lang="ts">
import { getCurrentInstance } from 'vue';

const instance = getCurrentInstance();
const $microActions = instance?.appContext.config.globalProperties.$microActions;
</script>
<style scoped lang="scss">
.home {
  height: 100%;
  font-size: 80px;
  background-color: rgb(224, 225, 248);
  color: pink;
}
</style>
