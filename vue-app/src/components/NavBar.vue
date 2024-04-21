<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <img style="width: 100px; height: 100%" src="@/assets/logo.svg" alt="Element logo" />
    </el-menu-item>
    <div class="flex-grow" />
    <template v-for="(item, index) in menus" :index="`${index}`">
      <el-menu-item :index="`${item.path}`">{{ item.title }}</el-menu-item>
      <el-sub-menu v-if="item.sub?.length > 0" :index="`${index}`">
        <template #title>{{ item.title }}</template>
        <!-- TODO: update sub menu later -->
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { menus } from '@/constants/menus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  router.push(key)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
