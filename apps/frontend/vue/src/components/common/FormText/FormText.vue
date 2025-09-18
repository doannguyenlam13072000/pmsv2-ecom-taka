<script lang="ts" setup>
import { useField } from "vee-validate";

type FormInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  disabled?: boolean;
  required?: boolean;
};

const props = defineProps<FormInputProps>();

const { value, errorMessage, handleBlur } = useField<string | number>(props.name);
</script>

<template>
  <el-form-item :label="label" :error="errorMessage" :required="required">
    <el-input v-model="value" :placeholder="placeholder" :type="type" :disabled="disabled" @blur="handleBlur" />
  </el-form-item>
</template>

<style scoped>
.is-error .el-input__wrapper {
  border-color: #f87171 !important;
  /* Tailwind red-400 */
}
</style>
