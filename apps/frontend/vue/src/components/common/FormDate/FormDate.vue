<script setup lang="ts">
import { useField } from "vee-validate";

type Props = {
  name: string;
  label: string;
  type?: "date" | "datetime";
  placeholder?: string;
  format?: string;
  valueFormat?: string;
};

const props = defineProps<Props>();

const { value, errorMessage, handleBlur } = useField<string>(props.name);
</script>

<template>
  <el-form-item :label="label" :error="errorMessage">
    <el-date-picker
      v-model="value" :type="type" :placeholder="placeholder" :format="format"
      :value-format="valueFormat" @blur="handleBlur"
    />
  </el-form-item>
</template>
