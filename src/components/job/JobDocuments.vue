<template>
  <ErrorMessage :error="error" @emit-closed="error = null" />
  <SuccessMessage :success="success" @emit-closed="success = null" />

  <div class="row">
    <div class="col mb-4">
      <UploadFile
        upload-url="/documents"
        :input-file-name="'documents[]'"
        :additional-form-data="{ job_id: jobId }"
        :trigger-upload="isTriggerUpload"
        @emit-success="handleUploadSuccess"
        @emit-error="handleUploadError"
      />
      <button class="mt-2 btn btn-outline-primary" @click="triggerDocumentsUpload">
        <i class="bi bi-upload"></i> Upload
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col-auto" v-for="document of documents" :key="document.id">
      <JobDocumentItem
        :document="document"
        @emit-deleted="handleDeleteSuccess"
        @emit-delete-error="handleDeleteError"
      ></JobDocumentItem>
    </div>
  </div>
</template>

<script setup>
import { findIndex } from 'lodash-es';
import { ref } from 'vue';

import ErrorMessage from '@/layouts/ErrorMessage.vue';
import SuccessMessage from '@/layouts/SuccessMessage.vue';
import UploadFile from '@/layouts/UploadFile.vue';
import JobDocumentItem from './JobDocumentItem.vue';

const props = defineProps({
  jobId: { type: Number, required: true },
  documents: {
    type: Object,
    required: true,
    default() {
      return [];
    }
  }
});

const error = ref();
const success = ref();

const documents = ref(props.documents);
const isTriggerUpload = ref(0);

const triggerDocumentsUpload = () => {
  isTriggerUpload.value++;
};

function handleDeleteSuccess(documentId) {
  success.value = `Job document #${documentId} deleted successfully.`;
  const index = findIndex(documents.value, { id: documentId });
  documents.value.splice(index, 1);
}

function handleDeleteError({ error: err }) {
  error.value = err;
}

function handleUploadSuccess(uploadedDocuments) {
  success.value = `Job document(s) ${uploadedDocuments.map(({ id }) => `#${id}`).join(',')} uploaded successfully.`;
  documents.value.push(...uploadedDocuments);
}

function handleUploadError({ error: err, uploadedFiles }) {
  if (uploadedFiles?.length) {
    handleUploadSuccess(uploadedFiles);
  }
  error.value = err;
}
</script>

<style scoped></style>
