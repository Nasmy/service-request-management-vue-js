<template>

  <ErrorMessage :error="error" @emit-closed="error = null" />
  <nav aria-label="pagination">
    <ul class="pagination pagination-sm">
      <li class="page-item"><a class="page-link" @click="paginationFirst()" >First</a></li>
      <li class="page-item"><a class="page-link" @click="paginationPrevious()" >Previous</a></li>
      <li class="page-item"><a class="page-link" @click="paginationNext()" >Next</a></li>
      <li class="page-item"><a class="page-link" @click="paginationLast()" >Last</a></li>
    </ul>
  </nav>
</template>

<script setup>
import client from "@/interceptors/client";
import ErrorMessage from "@/layouts/ErrorMessage.vue";
import { ref } from "vue";

const props = defineProps({
  paginationData: Object
});

const emit = defineEmits(['emitPaginationResult', 'emitPaginationLink']);

const error = ref();
const api = ref();
const pagination = ref();

const paginationFirst = () => {
  client
    .get(props.paginationData.first_page_url)
    .then((res) => {
      api.value = res.data.data;
      pagination.value = res.data.pagination;
      emit('emitPaginationResult', api.value);
      emit('emitPaginationLink', pagination.value);
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });
};

const paginationPrevious = () => {
  if ( props.paginationData?.prev_page_url ) {
    client
      .get(props.paginationData.prev_page_url)
      .then((res) => {
        api.value = res.data.data;
        pagination.value = res.data.pagination;
        emit('emitPaginationResult', api.value);
        emit('emitPaginationLink', pagination.value);
      })
      .catch((err) => {
        error.value = err.response.data.message;
      });
  }
};

const paginationNext = () => {
  if ( props.paginationData?.next_page_url ) {
    client
      .get(props.paginationData.next_page_url)
      .then((res) => {
        api.value = res.data.data;
        pagination.value = res.data.pagination;
        emit('emitPaginationResult', api.value);
        emit('emitPaginationLink', pagination.value);
      })
      .catch((err) => {
        error.value = err.response.data.message;
      });
  }
};

const paginationLast = () => {
  if ( props.paginationData?.last_page_url ) {
    client
      .get(props.paginationData.last_page_url)
      .then((res) => {
        api.value = res.data.data;
        pagination.value = res.data.pagination;
        emit('emitPaginationResult', api.value);
        emit('emitPaginationLink', pagination.value)
      })
      .catch((err) => {
        error.value = err.response.data.message;
      });
  }
};


</script>

