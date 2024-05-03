<script setup lang="ts" name="TabbarLeft">
import {useLayOutStore} from "@/store/modules/layout.ts";

const layoutStore = useLayOutStore()
const changeIcon = () => layoutStore.foldFlag = ! layoutStore.foldFlag
</script>

<template>
  <div class="tabbar-left">
    <el-icon style="margin-right: 10px" @click="changeIcon">
      <Expand v-if="!layoutStore.foldFlag"/>
      <Fold v-if="layoutStore.foldFlag"/>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
<!--      此处用v-show是因为v-for优先级比v-if高-->
      <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="!item.meta.hidden">
        <el-icon style="vertical-align: middle">
          <component :is="item.meta.icon"></component>
        </el-icon>
        {{item.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.tabbar-left {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
</style>