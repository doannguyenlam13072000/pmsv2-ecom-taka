<script setup lang="ts">
import { ref } from "vue";

import { formatDate, formatDateTime, getNow, timeAgo, utcToLocal } from "@/utils/date";
import { navigateTo } from "@/utils/navigate";

const rawDate = ref("2025-06-27T13:45:00Z");

const formatted = formatDate(rawDate.value); // e.g. "27/06/2025"
const dateTime = formatDateTime(rawDate.value); // e.g. "27/06/2025 20:45"
const ago = timeAgo(rawDate.value); // e.g. "in 1 day"
const localTime = utcToLocal(rawDate.value); // e.g. "27/06/2025 20:45"
</script>

<template>
  <div class="p-4">
    <el-button type="info" @click="navigateTo('/')">
      Back
    </el-button>
    <h1 class="text-xl font-bold mb-4">
      Form input:
    </h1>
    <FormText label="Email" name="email" type="email" />
    <FormText label="Password" name="password" type="password" />
    <FormCheckBox name="rememberMe" checkbox-label="Remember me" />
    <FormCheckBoxGroup
      name="test" label="Checkbox group"
      :options="[{ label: 'Option 1', value: 'option_1' }, { label: 'Option 2', value: 'option_2' }]"
    />
    <FormDate name="date" label="Birthday" type="date" />
    <FormFile name="file" label="Attachments" />
    <FormNumber name="number" label="Number" />
    <FormRadio
      name="gender" label="Gender"
      :options="[{ label: 'Male', value: 0 }, { label: 'Female', value: 1 }]"
    />
    <FormSelect
      remote filterable name="country" label="Country"
      :options="[{ label: 'VietNam', value: 'vi' }, { label: 'Japan', value: 'ja' }]"
    />
    <FormSwitch name="toggle" label="On/Off" />
    <FormTextarea name="description" label="Description" />
    <hr>

    <h1 class="text-xl font-bold mb-4">
      Date js
    </h1>
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
