<template>
  <div class="wrapper">
    <div class="document-item cursor-pointer mx-auto" :class="{ 'cursor-pointer': thumbnailIcon }" :title="fileName">
      <i class="thumb-icon bi" v-if="thumbnailIcon" :class="thumbnailIcon"></i>
      <el-image v-else :src="documentUrl" :preview-src-list="[documentUrl]" :initial-index="4" fit="cover" />

      <div class="dropdown position-absolute">
        <button class="btn dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-gear"></i>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" @click.prevent="downloadDocument">Download</a></li>
          <li><a class="dropdown-item text-danger" @click.prevent="confirmDocumentDelete">Delete</a></li>
        </ul>
      </div>
    </div>
    <div class="text-filename text-break mx-auto">{{ fileName }}</div>
  </div>
</template>

<script setup>
import { get } from 'lodash-es';
import { computed, onMounted, ref } from 'vue';

import client from '@/interceptors/client';

const props = defineProps({
  document: { type: Object, required: true }
});

const documentId = ref();
const documentUrl = ref();
const fileName = ref();
const mimeType = ref();

const emit = defineEmits(['emit-deleted', 'emit-delete-error']);

const thumbnailIcon = computed(() => {
  if (mimeType.value === 'application/pdf') {
    return 'bi-file-earmark-pdf-fill';
  }
  if (['application/msword', 'application/vnd.openxmlformats'].includes(mimeType.value)) {
    return 'bi-file-earmark-word-fill';
  }
  return '';
});

onMounted(() => {
  documentId.value = props.document.id;
  documentUrl.value = props.document.path;
  fileName.value = props.document.name;
  mimeType.value = props.document.type;
});

function downloadDocument() {
  client
    .get(documentUrl.value, {
      params: { timestamp: new Date().getTime() },
      responseType: 'blob',
      headers: { Authorization: '' }
    })
    .then(res => {
      const blob = new Blob([res.data.data], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      const filename = `${documentUrl.value.split('/').pop()}`;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .catch(console.error);
}

function confirmDocumentDelete() {
  if (confirm('Are you sure you want to delete this document?')) {
    deleteDocument();
  }
}

function deleteDocument() {
  client
    .delete(`/documents/${documentId.value}`)
    .then(res => {
      emit('emit-deleted', documentId.value);
    })
    .catch(err => {
      console.error(err);
      emit('emit-delete-error', { error: get(err, 'response.data.data', err), id: documentId.value });
    });
}
</script>

<style scoped>
.wrapper {
  --width: 100px;
  --height: 100px;
}

.document-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: var(--width);
  height: var(--height);
  margin: 0 -8px 16px 0;
  border-radius: 4px;
  background-color: rgba(200, 200, 200, 0.6);
  position: relative;
  border: 1px solid #bebebe;
}

.dropdown {
  position: absolute;
  bottom: 0;
  right: 0;
  margin-left: 6px;
  margin-top: 6px;
}

button {
  outline: 0;
}

.el-image {
  width: var(--width);
  height: var(--height);
}

.thumb-icon {
  font-size: 1.5rem;
  opacity: 0.5;
}

.cursor-pointer {
  cursor: pointer;
}

.text-filename {
  max-width: calc(1.5 * var(--width));
}
</style>
