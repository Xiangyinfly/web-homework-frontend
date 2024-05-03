<script setup lang="ts" name="Main">
import {useLayOutStore} from "@/store/modules/layout.ts";
import {nextTick, watch} from "vue";

const layoutStore = useLayOutStore()

/**
 * 实现刷新业务：
 * 在pinia里面存储refreshFlag，默认为false
 * 当点击刷新按钮时，绑定事件将refreshFlag改为true
 * refreshFlag变为true的同时，由于main组件的v-if的值为!refreshFlag，组件销毁
 * refreshFlag变为true的同时，监听到refreshFlag的变化，后调用nextTick将refreshFlag值变为false，组件重新渲染
 */
watch(() => layoutStore.refreshFlag,() => {
  nextTick(() => layoutStore.refreshFlag = false)
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="!layoutStore.refreshFlag"/>
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>