<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import { LAYOUT } from '@/constants/layout'

const route = useRoute()

const layout = computed<string>(() => {
  return (route.meta.layout || LAYOUT.PUBLIC) + '-layout'
})
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
