<script setup lang="ts">
import {User,Lock} from '@element-plus/icons-vue'
import {reactive, ref} from "vue";
import {useUserStore} from "@/store/modules/user.ts";
import {useRouter} from "vue-router";
import {ElNotification} from "element-plus";
import {getTime} from "@/utils/time.ts";

let userStore = useUserStore()
let $router = useRouter()
let loading = ref(false)
const message = getTime()
const loginForm = ref()
const login = async () => {
  await loginForm.value.validate()
  loading.value = true
  try {
    await userStore.userLogin(loginData)
    await $router.push('/')
    ElNotification({
      type: "success",
      message
    })
    loading.value = false
  } catch (e) {
    loading.value = false
    ElNotification({
      type: "error",
      message: (e as Error).message
    })
  }
}

const rules = {
  username: [
    { required: true, min: 3, max: 18, message: 'Length should be 3 to 18', trigger: 'change' }
  ],
  password: [
    { required: true, min: 6, max: 18, message: 'Length should be 6 to 18', trigger: 'change' }
  ]
}

let loginData = reactive({
  username:'jinyong',
  password:'123456'
})

</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="8" :xs="0"></el-col>
      <el-col :span="8" :xs="24">
        <el-form class="login_form" :model="loginData" :rules="rules" ref="loginForm">
          <h1>你好👋</h1>
          <h2>欢迎来到培训管理系统🏠</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginData.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" type="password" v-model="loginData.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" size="default" :loading="loading" @click="login">Sign in</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-col :span="8" :xs="0"></el-col>
  </div>
</template>



<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('../../../public/background.png') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>