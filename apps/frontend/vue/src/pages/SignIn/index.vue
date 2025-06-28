<script setup lang="ts">
import { useSignIn } from "./useSignIn";

const { handleSignIn } = useSignIn();
</script>

<template>
  <h1>Sign In</h1>
  <el-button type="danger" @click="handleSignIn">
    Click me
  </el-button>
</template>
