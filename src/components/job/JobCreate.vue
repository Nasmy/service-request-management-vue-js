<template>
  <ErrorMessage :error="error" @emit-closed="error = null" />
  <SuccessMessage :success="success" @emit-closed="success = null" />

  <h5>Citizen</h5>
  <hr />
  <div class="row">
    <p>Select Citizen and contact information</p>
    <SearchCitizenContact @emitContactId="setContactId" />
  </div>

  <h5>Subject</h5>
  <hr />
  <div class="row">
    <div class="col-6">
      <label>Subject</label>
      <input type="text" required class="form-control" v-model="inputSubject" />
    </div>
    <div class="col-6">
      <label>Notes</label>
      <textarea class="form-control" v-model="inputNotes"></textarea>
    </div>
  </div>

  <h5>File</h5>
  <hr />
  <div class="row">
    <UploadFile
      :upload-url="uploadAction"
      :input-file-name="'documents[]'"
      :additional-form-data="additionalUploadData"
      :trigger-upload="isTriggerUpload"
      @emit-success="handleUploadSuccess"
      @emit-error="handleUploadError"
    />
  </div>

  <h5>Date</h5>
  <hr />
  <div class="row mt-3">
    <div class="col-3">
      <i class="bi bi-calendar m-1"></i>
      <label for="start">Start</label>
      <input class="m-2" type="date" v-model="inputStartDate" required />
    </div>
    <div class="col-3">
      <i class="bi bi-calendar m-1"></i>
      <label for="end">End</label>
      <input class="m-2" type="date" v-model="inputEndDate" required />
    </div>
    <div class="col-6">
      <button type="button" class="btn btn-secondary m-1 col-2" @click="setDateToday()">Today</button>
      <button type="button" class="btn btn-secondary m-1 col-2" @click="addDayToDate(7)">+ 7</button>
      <button type="button" class="btn btn-secondary m-1 col-2" @click="addDayToDate(30)">+ 30</button>
    </div>
  </div>

  <h5>Assign to</h5>
  <hr />
  <div v-if="componentLoader">
    <SelectUser @emitSelectUserId="setAssignedToUserId" class="col-3" />
  </div>

  <button @click="createJob()" type="button" class="btn btn-primary btn-lg">Create</button>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import router from '@/router/index.js';
import client from '@/interceptors/client';

import SearchCitizenContact from '@/components/search/SearchCitizenContact.vue';

import ErrorMessage from '@/layouts/ErrorMessage.vue';
import SelectUser from '@/layouts/SelectUser.vue';
import SuccessMessage from '@/layouts/SuccessMessage.vue';
import UploadFile from '@/layouts/UploadFile.vue';

const inputSubject = ref('');
const inputStartDate = ref();
const inputEndDate = ref();
const inputAssignedToUser = ref();
const inputNotes = ref('');
const inputContactId = ref();
const inputStatus = ref('todo');

const componentLoader = ref(false);
const error = ref();
const success = ref();
const uploadAction = ref('/documents');
const additionalUploadData = ref(null);
const isTriggerUpload = ref(0);

onMounted(() => {
  componentLoader.value = true;
});

// assign user id with emit
const setAssignedToUserId = value => {
  inputAssignedToUser.value = value;
};

const setContactId = value => {
  inputContactId.value = value;
};

// date logic
const setDateToday = () => {
  inputStartDate.value = new Date().toISOString().slice(0, 10);
  const step = 7 * 24 * 3600 * 1000;
  inputEndDate.value = new Date(Date.now() + step).toISOString().slice(0, 10);
};
setDateToday();

const addDayToDate = days => {
  const addDay = days * 24 * 3600 * 1000; // day in milliseconds
  const step = addDay + 7 * 24 * 3600 * 1000;
  inputStartDate.value = new Date(Date.now() + addDay).toISOString().slice(0, 10);
  inputEndDate.value = new Date(Date.now() + addDay + step).toISOString().slice(0, 10);
};

const triggerDocumentsUpload = () => {
  isTriggerUpload.value++;
};

const createJob = () => {
  // Check for upload retry
  if (additionalUploadData.value && error.value) {
    triggerDocumentsUpload();
    return;
  }

  additionalUploadData.value = null;
  client
    .post('/jobs', {
      subject: inputSubject.value,
      start_date: inputStartDate.value,
      end_date: inputEndDate.value,
      assigned_to_user: inputAssignedToUser.value,
      notes: inputNotes.value,
      contact_id: inputContactId.value,
      status: inputStatus.value
    })
    .then(res => {
      additionalUploadData.value = { job_id: res.data.data.id };
      triggerDocumentsUpload();
    })
    .catch(err => {
      error.value = err.response.data.data;
    });
};

const handleUploadSuccess = () => {
  additionalUploadData.value = null;
  success.value = 'Job created !';
  router.push({ name: 'JobDashboard' });
};

const handleUploadError = ({ error: err }) => {
  error.value = err;
};
</script>
