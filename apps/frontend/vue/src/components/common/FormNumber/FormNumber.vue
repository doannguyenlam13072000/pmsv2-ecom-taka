<script setup lang="ts">
import { useField } from "vee-validate";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
};
const props = defineProps<Props>();

const {
  value,
  errorMessage,
  handleBlur,
} = useField<number>(props.name);
</script>

<template>
  <el-form-item :label="label" :error="errorMessage">
    <el-input-number
      v-model="value" :min="min" :max="max" :step="step" :placeholder="placeholder"
      :disabled="disabled" controls-position="right" @blur="handleBlur"
    />
  </el-form-item>
</template>
