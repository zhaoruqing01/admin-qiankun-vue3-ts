<template>
  <div>
    <!-- header -->
    <nav class="header-nav">顶部导航</nav>
    <!-- menu -->
    <ul class="menu">
      <li
        v-for="item in router.options.routes"
        :key="item.name"
        @click="handleClick(item.name as string)"
      >
        {{ item.meta?.title || item.name }}
      </li>
    </ul>
    <!-- container -->
    <div class="micro-app-container">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from './router';

const handleClick = (name: string) => {
  router.push({ name });
};
</script>
<style lang="scss" scoped>
.header-nav {
  height: 60px;
  line-height: 60px;
  background-color: #003392;
  color: #fff;
}
.menu {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    line-height: 60px;
    width: 200px;
    background-color: #f8f8f8;
    color: #003392;
    cursor: pointer;
  }
  li:hover {
    background-color: #003392;
    color: #fff;
  }
}
.micro-app-container {
  position: absolute;
  top: 80px;
  left: 220px;
  right: 20px;
  bottom: 20px;
  background-color: #f9fafb;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
