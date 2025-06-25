<script setup lang="ts">
const props = defineProps<{
  error?: Error;
}>();

const errorMessage = props.error?.message ?? "Unknown error";
</script>

<template>
  <div class="text-center text-red-600 p-4">
    <h2 class="text-xl font-bold">
      Something went wrong
    </h2>
    <p>{{ errorMessage }}</p>
  </div>
</template>
