<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";

import { LAYOUT } from "./constants";

const route = useRoute();
const layout = computed<string>(() => {
  return `${route.meta?.layout || LAYOUT.PUBLIC}-layout`;
});
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
