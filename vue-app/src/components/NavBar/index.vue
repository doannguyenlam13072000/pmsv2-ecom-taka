<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <img style="width: 40px; height: 40px" src="@/assets/logo.svg" alt="Element logo" />
    </el-menu-item>
    <div class="flex-grow"></div>
    <template v-for="(item, index) in menus" :index="`${index}`">
      
      <el-sub-menu v-if="item.subs?.length > 0" :index="`${index}`">
        <template #title>{{ item.title }}</template>
        <template v-for="(sub, idx) in item.subs" :key="idx">
          <el-menu-item :index="sub.path">{{ sub.title }}</el-menu-item>
        </template>
      </el-sub-menu>

      <el-menu-item v-else :index="item.path">{{
        item.subs?.length > 0 ? '' : item.title
      }}</el-menu-item>
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
  // console.log(key, keyPath)
  router.push(key)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
