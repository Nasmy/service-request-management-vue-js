<template>
  <ErrorMessage :error="error" @emit-closed="error = null" />
  <OneColumn>
    <template v-slot:col1>
      <p class="display-6 mb-4">{{ $t('Dashboard') }}</p>
      <div class="row">
        <div class="col d-flex justify-content">
          <RouterLink to="/job-create" class="btn btn-primary" role="button" aria-disabled="true">{{
            $t('Add request')
          }}</RouterLink>
        </div>
      </div>

      <div class="row mt-5">
        <DashBoardColumn>
          <template v-slot:DashboardColumnTitle> To Do </template>
          <template v-slot:DashboardColumn>
            <template v-for="item in jobTodo" :key="item.id">
              <JobCard
                :id="item.id"
                :title="item.subject"
                :contact="item.created_by.last_name"
                :dateStart="item.start_date"
                :note="item.notes"
                @emitDeleteJob="getJobToDo()"
              />
            </template>

            <div class="text-center">
              <LoadMore
                :load-more-handler="loadNextJobTodo"
                :can-load-more="jobTodoPagination?.next_page_url"
              ></LoadMore>
            </div>
          </template>
        </DashBoardColumn>

        <DashBoardColumn>
          <template v-slot:DashboardColumnTitle> In Progress </template>
          <template v-slot:DashboardColumn>
            <template v-for="item in jobInProgress" :key="item.id">
              <JobCard
                :id="item.id"
                :title="item.subject"
                :contact="item.created_by.last_name"
                :dateStart="item.start_date"
                :note="item.notes"
                @emitDeleteJob="getJobInProgress()"
              />
            </template>

            <div class="text-center">
              <LoadMore
                :load-more-handler="loadNextJobInProgress"
                :can-load-more="jobInProgressPagination?.next_page_url"
              ></LoadMore>
            </div>
          </template>
        </DashBoardColumn>

        <DashBoardColumn>
          <template v-slot:DashboardColumnTitle> Completed </template>
          <template v-slot:DashboardColumn>
            <template v-for="item in jobCompleted" :key="item.id">
              <JobCard
                :id="item.id"
                :title="item.subject"
                :contact="item.created_by.last_name"
                :dateStart="item.start_date"
                :note="item.notes"
                @emitDeleteJob="getJobCompleted()"
              />
            </template>

            <div class="text-center">
              <LoadMore
                :load-more-handler="loadNextJobCompleted"
                :can-load-more="jobCompletedPagination?.next_page_url"
              ></LoadMore>
            </div>
          </template>
        </DashBoardColumn>
      </div>
    </template>
  </OneColumn>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import client from '@/interceptors/client';
import ErrorMessage from '@/layouts/ErrorMessage.vue';
import JobCard from '@/components/job/JobCard.vue';

import DashBoardColumn from '@/layouts/DashBoardColumn.vue';
import OneColumn from '@/layouts/OneColumn.vue';
import LoadMore from '@/layouts/LoadMore.vue';

const error = ref();
const jobTodo = ref();
const jobInProgress = ref();
const jobCompleted = ref();
const jobTodoPagination = ref();
const jobInProgressPagination = ref();
const jobCompletedPagination = ref();

const getJobToDo = () => {
  return getJobByStatus('todo').then(res => {
    jobTodo.value = res.data.data;
    jobTodoPagination.value = res.data.pagination;
  });
};
getJobToDo();

const getJobInProgess = () => {
  getJobByStatus('in_progress').then(res => {
    jobInProgress.value = res.data.data;
    jobInProgressPagination.value = res.data.pagination;
  });
};
getJobInProgess();

const getJobCompleted = () => {
  getJobByStatus('completed').then(res => {
    jobCompleted.value = res.data.data;
    jobCompletedPagination.value = res.data.pagination;
  });
};
getJobCompleted();

function getJobByStatus(status) {
  return client.get(`jobs/search`, { params: { status, per_page: 10 } }).catch(err => {
    error.value = err.response.data.message;
  });
}

const loadNextJobTodo = () => {
  if (jobTodoPagination.value?.next_page_url) {
    client
      .get(jobTodoPagination.value.next_page_url)
      .then(res => {
        jobTodo.value.push(...res.data.data);
        jobTodoPagination.value = res.data.pagination;
      })
      .catch(err => {
        error.value = err.response.data.message;
      });
  }
};

const loadNextJobInProgress = () => {
  if (jobInProgressPagination.value?.next_page_url) {
    client
      .get(jobInProgressPagination.value.next_page_url)
      .then(res => {
        jobInProgress.value.push(...res.data.data);
        jobInProgressPagination.value = res.data.pagination;
      })
      .catch(err => {
        error.value = err.response.data.message;
      });
  }
};

const loadNextJobCompleted = () => {
  if (jobCompletedPagination.value?.next_page_url) {
    client
      .get(jobCompletedPagination.value.next_page_url)
      .then(res => {
        jobCompleted.value.push(...res.data.data);
        jobCompletedPagination.value = res.data.pagination;
      })
      .catch(err => {
        error.value = err.response.data.message;
      });
  }
};
</script>
