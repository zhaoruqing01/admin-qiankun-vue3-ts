<template>
  <div>
    <ul class="nav">
      <li v-for="value in router.options.routes" :key="value.path" @click="router.push(value.path)">
        {{ value.name }}
      </li>
    </ul>
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import router from './router';
</script>
<style scoped>
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #ef3030;
}
.nav > li {
  margin: 0 10px;
  cursor: pointer;
}
</style>
