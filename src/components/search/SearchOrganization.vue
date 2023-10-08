<template>
  <div class="input-group">
    <span class="input-group-text">Search existing Organization</span>
    <input v-model.trim="inputSearch" type="text" class="form-control" @input="triggerSearchOrganization()" />
  </div>
  <div id="suggestion" v-if="searchOrganizationResult">
    <span v-if="!searchOrganizationResult.length">No result found!</span>
    <ul id="suggestion-item">
      <li
        v-for="item in searchOrganizationResult"
        :key="item.id"
        @click="selectThisOrganization(item), closeSuggestion(), triggerEmit()"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
  <div v-if="selectOrganization">
    <p>You selected : {{ selectOrganization.name }}</p>
  </div>
</template>

<script setup>
import { client, requestCancelHandler } from '@/interceptors/client';
import { debounce } from 'lodash-es';
import { ref } from 'vue';

const error = ref('');

const inputSearch = ref('');
const searchOrganizationResult = ref();
const selectOrganization = ref();
const searchRequestController = ref();

const triggerSearchOrganization = debounce(() => {
  if (inputSearch.value.length > 2) {
    searchRequestController.value?.abort();
    searchRequestController.value = requestCancelHandler();
    searchOrganization();
  }
}, 500);

const searchOrganization = () => {
  client
    .get(
      'organizations/search',
      { params: { search: inputSearch.value, all: 1 } },
      { signal: searchRequestController.value?.signal }
    )
    .then(res => {
      searchRequestController.value = null;
      searchOrganizationResult.value = res.data.data;
    })
    .catch(err => {
      searchRequestController.value = null;
      error.value = err.response.data.message;
    });
};

const selectThisOrganization = selection => {
  selectOrganization.value = selection;
};

const closeSuggestion = () => {
  searchOrganizationResult.value = '';
};

const emit = defineEmits(['emitOrganizationSearch']);
const triggerEmit = () => {
  emit('emitOrganizationSearch', selectOrganization.value);
};
</script>

<style scoped>
#suggestion {
  background: rgba(255, 255, 255, 1);
  position: sticky;
  width: 80%;
  overflow: hidden;
  overflow-y: scroll;
  border: 1px solid #bababa;
  padding: 1%;
  z-index: 1000;
  border-radius: 5px;
  cursor: pointer;
}

#suggestion-item li:hover {
  background-color: rgb(244, 244, 244);
}
</style>
