<script lang="ts" setup>
import type { FormWrapperProps } from "./useFormWrapper";

import { useFormWrapper } from "./useFormWrapper";

const props = defineProps<FormWrapperProps<any>>();
const {
  errors,
  isSubmitting,
  handleSubmitForm,
} = useFormWrapper(props);
</script>

<template>
  <el-form label-width="auto" label-position="top" @submit="handleSubmitForm">
    <!-- Form content -->
    <slot />
    <el-button
      :disabled="Object.entries(errors).length > 0" native-type="submit" type="success"
      :loading="isSubmitting"
    >
      {{ submitLabel }}
    </el-button>
  </el-form>
</template>
