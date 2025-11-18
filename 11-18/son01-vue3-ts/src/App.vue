<script setup lang="ts">
import router from './router';
</script>

<template>
  <div class="son01-app">
    <ul>
      <li v-for="value in router.options.routes" :key="value.path" class="menu-item">
        <router-link :to="value.path" active-class="active">{{ value.name }}</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.son01-app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
  padding: 10px;
  flex-shrink: 0;
}

.active {
  color: rgb(10, 6, 248);
}

.menu-item {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  width: 100px;
  height: 30px;
  background-color: rgb(182, 255, 168);
  cursor: pointer;
}
</style>
