<template>
  <div
    id="upload-document"
    @drop.prevent="handleDrop"
    @dragover.prevent="handleDragOver"
    @dragenter.prevent="handleDragEnter"
    @dragleave.prevent="handleDragLeave"
  >
    <div class="text-center">
      <label>
        <input ref="filesRef" type="file" multiple @change="handleInputFileChange($event.target)" />
      </label>
      <i class="bi bi-paperclip"></i>
      <div class="upload-text">Drop file here or click to upload.</div>
    </div>
  </div>
  <template v-if="inputFiles">
    <ul class="text-secondary list-unstyled">
      <li v-for="(file, index) in inputFiles" :key="file.name">
        {{ file?.name }}
        <i id="delete-upload-file" class="bi bi-x text-end" @click="removeFile(index)"></i>
      </li>
    </ul>
  </template>
</template>

<script lang="ts" setup>
import { filter, forEach, get } from 'lodash-es';
import { ref, watch } from 'vue';

import client from '@/interceptors/client';

const props = defineProps({
  inputFileName: { type: String, required: true },
  uploadUrl: { type: String, required: true },
  additionalFormData: { type: Object },
  triggerUpload: { type: Boolean }
});
const emit = defineEmits(['emit-success', 'emit-error']);

const inputFiles = ref<File[] | null>();

watch(
  () => props.triggerUpload,
  () => uploadFiles()
);

const handleDrop = (event: DragEvent) => {
  const dt = event.dataTransfer;
  const files = dt?.files;
  handleInputFileChange({ files } as any);
  (event.currentTarget as HTMLElement).classList.remove('hover');
};

const handleDragOver = (event: DragEvent) => {
  (event.currentTarget as HTMLElement).classList.add('hover');
};

const handleDragEnter = (event: DragEvent) => {
  (event.currentTarget as HTMLElement).classList.add('hover');
};

const handleDragLeave = (event: DragEvent) => {
  (event.currentTarget as HTMLElement).classList.remove('hover');
};

const handleInputFileChange = (target: EventTarget | null) => {
  const errors: any = [];
  inputFiles.value = filter(get(target, 'files', []), file => {
    if (file.size > 1024 * 1024) {
      errors.push(`The file ${file.name} is higher than limit of 1MB.`);
      return;
    }

    return file;
  });

  if (errors.length) {
    emit('emit-error', { error: errors });
  }
};

const removeFile = (index: number) => {
  inputFiles.value?.splice(index, 1);
};

const uploadFiles = async () => {
  const filesToUpload = [...(inputFiles.value || [])];
  if (!filesToUpload.length) return;
  const uploadedFiles = [];
  try {
    for (const [i, file] of filesToUpload.entries()) {
      const res = await uploadOneFile(file);
      uploadedFiles.push(...res.data.data);
      inputFiles.value?.splice(i, 1);
    }
    handleSuccess(uploadedFiles);
  } catch (error: any) {
    handleError(error, uploadedFiles);
  }
};

const uploadOneFile = async (file: File) => {
  const formData = new FormData();
  forEach(props.additionalFormData, (item, key) => {
    formData.append(key, item);
  });
  formData.append(props.inputFileName, file);
  return client.post(props.uploadUrl, formData);
};

const handleError = (error: Error, uploadedFiles: Object[] = []) => {
  emit('emit-error', { error: get(error, 'response.data.data', error), uploadedFiles });
};

const handleSuccess = (uploadedFiles: Object[]) => {
  inputFiles.value = null;
  emit('emit-success', uploadedFiles);
};
</script>

<style scoped>
#upload-document {
  position: relative;
  pointer-events: all;
}

#upload-document:hover > div,
#upload-document.hover > div {
  border: 1px solid rgb(13 110 253 / 25%);
  background-color: rgb(13 110 253 / 5%);
}

#upload-document > div {
  padding: 4% 3%;
  border: 1px dashed #dcdfe6;
  border-radius: 8px;
}

label {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
}

i {
  font-size: 3rem;
  cursor: pointer;
}

.upload-text {
  color: #606266;
  font-size: 14px;
  text-align: center;
}

#delete-upload-file {
  font-size: 1rem !important;
}

li:hover {
  background-color: rgb(13 110 253 / 5%);
}
</style>
