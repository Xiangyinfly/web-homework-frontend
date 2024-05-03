<script setup lang="ts" name="Layout">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import {useUserStore} from "@/store/modules/user.ts";
import {useLayOutStore} from "@/store/modules/layout.ts";

let userStore = useUserStore()
let layoutStore = useLayOutStore()
</script>

<template>
<div class="layout_container">
<!--  侧边栏-->
  <div class="layout_slider">
<!--    logo-->
    <Logo></Logo>
<!--    滚动组件-->
    <el-scrollbar class="scrollbar">
<!--    菜单组件-->
      <el-menu :collapse="!!layoutStore.foldFlag" background-color="$base-menu-background" text-color="white" active-text-color="bisque" router="true" :default-active="$route.path">
        <Menu :menuList="userStore.menuRoutes"></Menu>
      </el-menu>
    </el-scrollbar>
  </div>
<!--  顶部导航栏-->
  <div class="layout_tabbar" :class="{expand:!!layoutStore.foldFlag}">
    <Tabbar></Tabbar>
  </div>
<!--  内容展示区-->
  <div class="layout_main" :class="{expand:!!layoutStore.foldFlag}">
    <Main></Main>
  </div>
</div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background: bisque;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.5s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabbar {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: #4eaed1;
    top: 0;
    left: $base-menu-width;
    transition: all 0.5s;
    &.expand {
      left: $base-menu-fold-width;
      width: calc(100vw - $base-menu-fold-width);
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: #f4f0d9;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.5s;
    &.expand {
      left: $base-menu-fold-width;
      width: calc(100vw - $base-menu-fold-width);
    }
  }
}
</style>