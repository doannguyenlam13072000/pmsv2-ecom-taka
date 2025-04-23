<template>
  <el-sub-menu v-if="Array.isArray(menu.subs) && menu.subs.length > 0" :index="String(index)">
    <template #title>{{ menu.title }}</template>
    <SubMenu
      v-for="(sub, idx) in menu.subs"
      :key="idx"
      :menu="sub"
      :index="`${index}-${idx}`"
    ></SubMenu>
  </el-sub-menu>
  <el-menu-item v-else :index="String(index)">
    <RouterLink :to="menu.path"> {{ menu.title }} </RouterLink>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Menu } from '@/components/SideBar/types'

export default defineComponent({
  name: 'SubMenu',
  props: {
    menu: {
      type: Object as () => Menu,
      required: true
    },
    index: {
      type: String,
      require: true
    }
  }
})
</script>
