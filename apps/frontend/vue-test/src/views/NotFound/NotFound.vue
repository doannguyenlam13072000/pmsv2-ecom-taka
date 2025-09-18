<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const backToPrevious = () => {
  router.go(-1)
}
</script>
<template>
  <h1>Page not found</h1>
  <el-button @click="backToPrevious" type="primary">Back</el-button>
</template>
