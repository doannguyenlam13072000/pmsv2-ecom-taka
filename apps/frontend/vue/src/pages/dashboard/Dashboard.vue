<script setup lang="ts">
import { navigateTo } from "@/utils/navigate";

import { useCounter } from "./useDashboard";

const { counter, increment, handleSignOut } = useCounter();
</script>

<template>
  <div>
    <h1>
      Dashboard
    </h1>
    <p>Count: {{ counter.count }}</p>
    <el-button type="primary" plain @click="navigateTo('/sample')">
      Go to Sample page
    </el-button>
    <el-button type="danger" @click="increment">
      Click me
    </el-button>
    <el-button type="info" @click="handleSignOut">
      Sign Out
    </el-button>
  </div>
</template>
