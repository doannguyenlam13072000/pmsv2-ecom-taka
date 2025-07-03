<script setup lang="ts">
import { useField } from "vee-validate";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
};

const props = defineProps<Props>();

const { value, errorMessage, handleBlur } = useField<string>(props.name);
</script>

<template>
  <el-form-item :label="label" :error="errorMessage">
    <el-input v-model="value" type="textarea" :placeholder="placeholder" :rows="rows" @blur="handleBlur" />
  </el-form-item>
</template>
