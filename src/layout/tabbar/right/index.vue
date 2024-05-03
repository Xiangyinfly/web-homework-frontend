<script setup lang="ts" name="TabbarRight">
import {useLayOutStore} from "@/store/modules/layout.ts";
import {useUserStore} from "@/store/modules/user.ts";
import {useRouter} from "vue-router";

let layoutStore = useLayOutStore()
let userStore = useUserStore()
let $route = useRouter()

const refresh = () => {
  layoutStore.refreshFlag = true
}
const fullScreen = () => {
  let fullFlag = document.fullscreenElement
  if (!fullFlag) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const logout = async () => {
  await userStore.userLogout()
  $route.replace('/login')
}
</script>

<template>
  <div class="tabbar-right">
    <el-button size="small" icon="Refresh" circle @click="refresh"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img :src="userStore.userInfo.avatar" style="width: 24px;height: 24px;margin:0 15px;border-radius: 50%">
    <el-dropdown>
        <span class="el-dropdown-link">
          {{userStore.userInfo.name}}
          <el-icon class="el-icon--right">
            <arrow-down/>
          </el-icon>
        </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">Logout</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.tabbar-right {
  display: flex;
  align-items: center;
  margin-right: 15px;
}
</style>