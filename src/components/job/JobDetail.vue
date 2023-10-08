<template>
  <ErrorMessage :error="error" @emit-closed="error = null" />
  <SuccessMessage :success="success" @emit-closed="success = null" />

  <div class="row" v-if="componentLoaded">
    <div class="row mb-4">
      <div class="col display-6">
        <RouterLink :to="{ name: 'JobDashboard' }" class="col-1 d-inline-flex">
          <i class="bi bi-arrow-left"></i>
        </RouterLink>
        <span>
          {{ subject }} <em class="badge bg-secondary text-uppercase"> {{ statuses[status] }}</em>
        </span>
      </div>
      <div class="col">
        <div class="d-flex justify-content-end align-items-center">
          <button type="button" class="btn btn-outline-danger" @click="confirmJobDelete">
            <i class="bi bi-trash"></i>
            Delete
          </button>
          <JobStatusChange
            :jobStatus="status"
            :jobId="jobId"
            @emit-error="handleStatusChangeError"
            @emit-status-updated="handleStatusUpdated"
          ></JobStatusChange>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h4>Job details</h4>
        <p class="mt-4 text-muted">INFORMATION</p>
        <hr />

        <div class="row">
          <div class="col">From : {{ citizenTitle }} {{ citizenFullName }}</div>
        </div>

        <div class="row">
          <div class="col">
            <label for="start-date">Start:</label>
            <input id="startDate" class="m-2" type="date" v-model="startDate" @change="updateDates" />
          </div>
          <div class="col">
            <label for="end-date">End:</label>
            <input id="end-date" class="m-2" type="date" v-model="endDate" @change="updateDates" />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col">
            Additional note :
            <p>{{ notes }}</p>
          </div>
        </div>
        <p class="mt-4 text-muted">
          FILES
          <i class="bi bi-paperclip"></i>
        </p>
        <hr />
        <JobDocuments :job-id="jobId" :documents="documents"></JobDocuments>
      </div>

      <div class="col">
        <h4>Answer</h4>
        <p class="mt-4 text-muted">RECIPIENT</p>
        <hr />
        <address>
          <strong>Organization:</strong> {{ organization?.name }}
          <br />
          <template v-if="contact">
            <strong>Address:</strong> {{ citizenAddress }}<br />
            <i class="bi bi-telephone-fill"></i> <a :href="'tel:' + contact.phone"> {{ contact.phone }}</a>
            <br />
            <i class="bi bi-phone-fill"></i> <a :href="'tel:' + contact.mobile"> {{ contact.mobile }}</a>
            <br />
            <i class="bi bi-envelope-fill"></i> <a :href="'mailto:' + contact.email"> {{ contact.email }}</a>
            <br />
          </template>
        </address>

        <!-- <div class="row m-3">Ajouter des personnes en copie de la réponse</div> -->
        <p class="mt-4 text-muted">ANSWER TEMPLATE</p>
        <hr />
        Réponse Courrier (A4)
        <AnswerTemplate />

        <p class="mt-4 text-muted">CUSTOM ANSWER</p>
        <hr />
        <TextEditor />

        <p class="mt-4 text-muted">SIGNATURE</p>
        <hr />
        <Signature />

        <p class="mt-4 text-muted">EXPORT</p>
        <hr />
        <div class="row">
          <div class="col">
            <button type="button" class="btn btn-primary" @click="printAnswer">Print</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-primary" @click="exportAnswerToPDF">Export to PDF</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-primary" :disabled="isArchived" @click="archiveJob">Archive</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { identity, pick } from 'lodash-es';
import { computed, onMounted, ref } from 'vue';

import AnswerTemplate from '@/components/AnswerTemplate.vue';
import JobStatusChange from '@/components/job/JobStatusChange.vue';
import Signature from '@/components/Signature.vue';
import client from '@/interceptors/client';
import ErrorMessage from '@/layouts/ErrorMessage.vue';
import SuccessMessage from '@/layouts/SuccessMessage.vue';
import TextEditor from '@/plugins/TextEditor.vue';
import JobDocuments from './JobDocuments.vue';
import router from '@/router';

const props = defineProps({
  jobId: { type: Number, required: true }
});

/** DATA */
const error = ref();
const success = ref();
const componentLoaded = ref(false);

const statuses = ref({
  todo: 'TO DO',
  in_progress: 'IN PROGRESS',
  completed: 'COMPLETED',
  archived: 'ARCHIVED'
});

const status = ref();
const subject = ref('');
const startDate = ref('');
const endDate = ref('');
const notes = ref('');
const assignedToUser = ref(null);
const contact = ref();
const citizen = ref(null);
const organization = ref(null);
const documents = ref([]);

const citizenTitle = computed(() => {
  return citizen.value?.gender === 'm' ? 'Mr.' : citizen.value?.gender === 'f' ? 'Ms.' : '';
});

const citizenFullName = computed(() => {
  return [citizen.value?.firstname, citizen.value?.lastname].filter(identity).join(' ').trim();
});

const citizenAddress = computed(() => {
  return Object.values(pick(contact.value, ['zip', 'address', 'city']))
    .join(' ')
    .trim();
});

const isArchived = computed(() => status.value === 'archived');

onMounted(function () {
  getJobById();
});

function getJobById() {
  return client
    .get(`/jobs/${props.jobId}`)
    .then(res => {
      const job = res.data.data;

      subject.value = job.subject;
      status.value = job.status;
      startDate.value = job.start_date;
      endDate.value = job.end_date;
      notes.value = job.notes;

      contact.value = job.contact;
      citizen.value = job.contact?.citizen;
      organization.value = job.contact?.organization;
      assignedToUser.value = job.assignedToUser;
      documents.value = job.documents;

      componentLoaded.value = true;
    })
    .catch(err => {
      error.value = err.response.data;
    });
}

function updateDates() {
  return client
    .put(`/jobs/${props.jobId}`, { start_date: startDate.value, end_date: endDate.value })
    .then(_ => {
      success.value = 'Start and end dates updated successfully.';
    })
    .catch(err => {
      error.value = err.response.data;
    });
}

function handleStatusChangeError(err) {
  error.value = err;
}

function handleStatusUpdated(newStatus) {
  status.value = newStatus;
  success.value = `Job status updated to "${statuses.value[newStatus]}"`;
}

function printAnswer() {}

function exportAnswerToPDF() {}

function archiveJob() {
  return client
    .put(`/jobs/${props.jobId}`, { status: 'archived' })
    .then(res => {
      handleStatusUpdated(res.data.data.status);
    })
    .catch(err => {
      error.value = err.response.data;
    });
}

function confirmJobDelete() {
  if (confirm('Are you sure you want to delete this job?')) {
    deleteDocument();
  }
}

function deleteDocument() {
  return client
    .delete(`/jobs/${props.jobId}`)
    .then(_ => {
      confirm(`Job #${props.jobId} delete successfully.`);
      router.push({ name: 'JobDashboard' });
    })
    .catch(err => {
      error.value = err.response.data;
    });
}
</script>

<style scoped>
a {
  color: #000;
  text-decoration: none;
}

input[type='date'] {
  max-width: 120px;
}
</style>
