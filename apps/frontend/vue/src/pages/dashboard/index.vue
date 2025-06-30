<script setup lang="ts">
import { ref } from "vue";

import { useCounter } from "./useDashboard";

const { counter, increment, handleSignOut } = useCounter();

import { formatDate, formatDateTime, getNow, timeAgo, utcToLocal } from "@/utils/date";

const rawDate = ref("2025-06-27T13:45:00Z");

const formatted = formatDate(rawDate.value); // e.g. "27/06/2025"
const dateTime = formatDateTime(rawDate.value); // e.g. "27/06/2025 20:45"
const ago = timeAgo(rawDate.value); // e.g. "in 1 day"
const localTime = utcToLocal(rawDate.value); // e.g. "27/06/2025 20:45"
</script>

<template>
  <div class="space-y-2">
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

    <hr class="my-4">

    <h2>Datejs</h2>
    <div class="space-y-2 p-4">
      <p>📅 Original: {{ rawDate }}</p>
      <p>📆 Formatted: {{ formatted }}</p>
      <p>🕓 DateTime: {{ dateTime }}</p>
      <p>⏳ Time ago: {{ ago }}</p>
      <p>🌐 UTC to local: {{ localTime }}</p>
      <p>📆 Now: {{ getNow() }}</p>
    </div>
  </div>
</template>
