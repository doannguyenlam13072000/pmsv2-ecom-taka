<script setup lang="ts">
import { useField } from "vee-validate";

type Props = {
  name: string;
  label: string;
  options: { label: string; value: string }[];
};

const props = defineProps<Props>();

const {
  value,
  errorMessage,
  handleBlur,
} = useField<string[]>(props.name);
</script>

<template>
  <el-form-item :label="label" :error="errorMessage">
    <el-checkbox-group v-model="value" @blur="handleBlur">
      <el-checkbox v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>
