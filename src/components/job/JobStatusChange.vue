<template>
  <div class="dropdown">
    <select class="m-2 form-select" v-model="inputJobStatus" placeholder="Status" size="large" @change="updateJobStatus">
      <option v-for="(status, key) of statuses" :key="key" :label="status" :value="key"></option>
    </select>
  </div>
</template>

<script setup>
import client from '@/interceptors/client';
import { get } from 'lodash-es';
import { ref, watch } from 'vue';

const props = defineProps({
  jobId: Number,
  jobStatus: String
});

const emit = defineEmits(['emitStatusUpdated', 'emitError']);

const statuses = ref({
  todo: 'TO DO',
  in_progress: 'IN PROGRESS',
  completed: 'COMPLETED',
  archived: 'ARCHIVED'
});
const inputJobStatus = ref(props.jobStatus);

watch(
  () => props.jobStatus,
  status => {
    inputJobStatus.value = status;
  }
);

function updateJobStatus() {
  client
    .put(`jobs/${props.jobId}`, { status: inputJobStatus.value })
    .then(res => {
      emit('emitStatusUpdated', res.data.data.status);
    })
    .catch(err => {
      console.error(err);
      emit('emitError', get(err, 'response.data.data', err));
    });
}
</script>

<style></style>
