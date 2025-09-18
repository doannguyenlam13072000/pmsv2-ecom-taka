<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <!-- Left -->
    <el-menu-item index="-1">
      <img style="width: 40px; height: auto" src="@/assets/logo.svg" alt="Element logo" />
    </el-menu-item>
    <div class="flex-grow">
      <el-button type="primary" @click="handleLogin">Login</el-button>
    </div>

    <!-- Right -->
    <SubMenu v-for="(item, index) in menus" :menu="item" :key="index" :index="String(index)" />
  </el-menu>
</template>

<script lang="ts" setup>
import { menus } from '@/constants/menus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeIndex = ref<string>('1')

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleLogin = () => {
  router.push('/login')
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
