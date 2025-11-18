<template>
  <div class="about-container">
    <h2>ABOUT</h2>
    <div class="button-wrapper">
      <button @click="handleClick" class="action-btn">点击设置全局状态</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue';

const instance = getCurrentInstance();
const $onGlobalStateChange = instance?.appContext.config.globalProperties.$onGlobalStateChange;
const $setGlobalState = instance?.appContext.config.globalProperties.$setGlobalState;
const $qiankunInfo = instance?.appContext.config.globalProperties.$qiankunInfo;

const handleClick = () => {
  $setGlobalState({
    age: 100,
  });
};

onMounted(() => {
  if (typeof $onGlobalStateChange === 'function') {
    $onGlobalStateChange((state: any) => {
      console.log('收到全局状态更新:', state);
    }, true);
  } else if ($qiankunInfo?.onGlobalStateChange) {
    $qiankunInfo.onGlobalStateChange((state: any) => {
      console.log('通过 $qiankunInfo 收到全局状态更新:', state);
    }, true);
  }
});
</script>

<style scoped>
.about-container {
  color: red;
  font-size: 30px;
  font-weight: bold;
  padding: 20px;
  min-height: 150px;
}

h2 {
  color: red;
  font-size: 30px;
  font-weight: bold;
  margin: 0 0 15px 0;
}

.button-wrapper {
  margin-top: 15px;
}

.action-btn {
  padding: 10px 20px;
  font-size: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background-color: #45a049;
}
</style>
