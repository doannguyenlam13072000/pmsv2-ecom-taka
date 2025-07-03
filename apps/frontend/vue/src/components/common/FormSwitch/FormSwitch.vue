<script setup lang="ts">
import { useField } from "vee-validate";

type Props = {
  name: string;
  label: string;
  activeText?: string;
  inactiveText?: string;
  disabled?: boolean;
};

const props = defineProps<Props>();

const {
  value,
  errorMessage,
  handleBlur,
} = useField<boolean>(props.name);
</script>

<template>
  <el-form-item :label="label" :error="errorMessage">
    <el-switch
      v-model="value" :disabled="disabled" :active-text="activeText" :inactive-text="inactiveText"
      @blur="handleBlur"
    />
  </el-form-item>
</template>
