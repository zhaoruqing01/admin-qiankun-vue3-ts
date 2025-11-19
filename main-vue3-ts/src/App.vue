<template>
  <div class="main-layout">
    <!-- 顶部导航栏 -->
    <nav class="top-nav">顶部导航</nav>
    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 侧边菜单 -->
      <div class="menu">
        <ul>
          <li>
            <router-link to="/" active-class="active">首页</router-link>
          </li>
          <li>
            <router-link to="/son01-vue3-ts" active-class="active">vue3-ts子应用01</router-link>
          </li>
          <li>
            <router-link to="/son02-vue3-ts" active-class="active">vue3子应用02</router-link>
          </li>
        </ul>
      </div>
      <!-- 内容区 -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
/* 主布局容器 */
.main-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* 顶部导航栏 */
.top-nav {
  background-color: rgb(224, 225, 248);
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 18px;
  font-weight: bold;
  flex-shrink: 0;
  z-index: 1000;
}

/* 主内容区（侧边栏 + 内容区） */
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 侧边菜单 */
.menu {
  background-color: rgb(224, 225, 248);
  width: 200px;
  padding-top: 20px;
  flex-shrink: 0;
  overflow-y: auto;
  z-index: 999;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 10px 20px;
      height: 30px;
      background-color: rgb(224, 225, 248);
      color: #010000;

      a {
        text-decoration: none;
        color: inherit;
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
      }

      &:hover {
        background-color: rgb(68, 77, 255);
        color: white;
      }

      .active {
        color: rgb(0, 34, 226);
      }
    }
  }
}

/* 内容区 */
.content {
  flex: 1;
  overflow: hidden;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
