<script setup lang="ts">
import { useField } from "vee-validate";
import { ref } from "vue";

type Props = {
  name: string;
  label: string;
};

const props = defineProps<Props>();

const { value, errorMessage } = useField<File[]>(props.name);

const fileList = ref<any[]>([]);

function handleBeforeUpload(file: File) {
  value.value = [file];
  fileList.value = [file];
  return false; // prevent auto-upload
}
</script>

<template>
  <el-form-item :label="label" :error="errorMessage">
    <el-upload
      class="upload-demo" drag action="" :auto-upload="false" :before-upload="handleBeforeUpload"
      :file-list="fileList"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
    </el-upload>
  </el-form-item>
</template>
