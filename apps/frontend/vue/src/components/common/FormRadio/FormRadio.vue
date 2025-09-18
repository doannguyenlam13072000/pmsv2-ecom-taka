<script setup lang="ts">
import { useField } from "vee-validate";

type Props = {
  name: string;
  label: string;
  options: { label: string; value: string | number }[];
};

const props = defineProps<Props>();

const { value, errorMessage, handleBlur } = useField<string | number>(props.name);
</script>

<template>
  <el-form-item :label="label" :error="errorMessage">
    <el-radio-group v-model="value" @blur="handleBlur">
      <el-radio v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>
