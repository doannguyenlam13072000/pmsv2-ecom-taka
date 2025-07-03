<script setup lang="ts">
import { useField } from "vee-validate";

type FormCheckboxProps = {
  name: string;
  label?: string;
  checkboxLabel?: string;
  disabled?: boolean;
};

const props = defineProps<FormCheckboxProps>();

const {
  value,
  errorMessage,
  handleBlur,
} = useField<boolean>(props.name);
</script>

<template>
  <el-form-item :label="label" :error="errorMessage">
    <el-checkbox v-model="value" :disabled="disabled" @blur="handleBlur">
      {{ checkboxLabel }}
    </el-checkbox>
  </el-form-item>
</template>
