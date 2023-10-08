<template>
  <ErrorMessage :error="error" @emit-closed="error = null" />
  <div class="row my-4">
    <div class="col-6">
      <input
        v-model="inputSearch"
        @keyup.enter="searchCitizen"
        type="text"
        class="form-control"
        placeholder="search citizen by name, date..."
      />
    </div>
    <div class="col-6">
      <button @click="searchCitizen()" type="button" class="btn btn-primary">Search</button>
      <button @click="reset()" type="button" class="btn btn-danger ms-2" id="reset">Reset</button>
    </div>
  </div>
</template>

<script setup>
import client from '@/interceptors/client';
import { ref } from 'vue';
import ErrorMessage from '@/layouts/ErrorMessage.vue';

const error = ref();
const api = ref();
const inputSearch = ref();

const searchCitizen = () => {
  client
    .get('citizens/globalSearch', {
      params: { search: inputSearch.value, all: 1 }
    })
    .then(res => {
      api.value = res.data;
      triggerEmit();
    })
    .catch(err => {
      error.value = err.response.data.message;
    });
};

const reset = () => {
  inputSearch.value = '';
  client
    .get('citizens')
    .then(res => {
      api.value = res.data;
      triggerEmit();
    })
    .catch(err => {
      error.value = err.response.data.message;
    });
};

// emit result to other component
const emit = defineEmits(['emitSearchCitizenResult']);
const triggerEmit = () => {
  emit('emitSearchCitizenResult', api.value);
};
</script>
