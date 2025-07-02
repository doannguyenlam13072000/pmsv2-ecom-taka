<script setup lang="ts">
import { useField } from "vee-validate";
import { computed } from "vue";

type Option = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

type OptionGroup = {
  label: string;
  options: Option[];
};

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  options: Option[] | OptionGroup[];
  multiple?: boolean;
  clearable?: boolean;
  filterable?: boolean;
  remote?: boolean;
  loading?: boolean;
  loadingText?: string;
  remoteMethod?: (query: string) => void;
  filterMethod?: (query: string) => void;
  disabled?: boolean;
  collapseTags?: boolean;
};

const props = defineProps<Props>();

const {
  value,
  errorMessage,
  handleBlur,
} = useField<any>(props.name);

const isGrouped = computed(() =>
  Array.isArray(props.options)
  && "options" in props.options[0],
);
</script>

<template>
  <el-form-item :label="label" :error="errorMessage">
    <el-select
      v-model="value" :placeholder="placeholder" :multiple="multiple" :clearable="clearable"
      :filterable="filterable" :remote="remote" :remote-method="remoteMethod" :filter-method="filterMethod"
      :disabled="disabled" :collapse-tags="collapseTags" :loading="loading" :loading-text="loadingText"
      style="width: 100%" @blur="handleBlur"
    >
      <!-- Grouped options -->
      <template v-if="isGrouped">
        <el-option-group v-for="group in options as OptionGroup[]" :key="group.label" :label="group.label">
          <el-option
            v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"
            :disabled="item.disabled"
          />
        </el-option-group>
      </template>

      <!-- Flat options -->
      <template v-else>
        <el-option
          v-for="item in options as Option[]" :key="item.value" :label="item.label" :value="item.value"
          :disabled="item.disabled"
        />
      </template>
    </el-select>
  </el-form-item>
</template>
