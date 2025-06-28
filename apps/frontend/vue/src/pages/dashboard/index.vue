<script setup lang="ts">
import { useCounter } from "./useDashboard";

const { counter, increment, handleSignOut } = useCounter();
</script>

<template>
  <h1>
    Dashboard
  </h1>
  <p>Count: {{ counter.count }}</p>
  <el-button type="danger" @click="increment">
    Click me
  </el-button>

  <el-button type="info" @click="handleSignOut">
    Sign Out
  </el-button>
</template>
