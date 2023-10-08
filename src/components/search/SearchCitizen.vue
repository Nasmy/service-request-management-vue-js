<template>
  <div class="input-group">
    <span class="input-group-text">Search existing citizen</span>
    <input
      v-model.trim="inputSearch"
      type="text"
      class="form-control"
      @input="triggerSearchCitizen()"
      placeholder="Enter at least 3 characters..."
    />
  </div>

  <div id="suggestion" v-if="searchCitizenResult">
    <span v-if="!searchCitizenResult.length">No result found!</span>
    <ul id="suggestion-item">
      <li
        v-for="item in searchCitizenResult"
        :key="item.id"
        @click="selectThisCitizen(item), closeSuggestion(), triggerEmit()"
      >
        {{ item.firstname }}
        {{ item.lastname }}
        {{ item.birthdate }}
        {{ item.gender }}
      </li>
    </ul>
  </div>
  <div v-if="selectCitizen">
    <p>
      Citizen selected :
      {{ selectCitizen.firstname }}
      {{ selectCitizen.lastname }}
      {{ selectCitizen.birthdate }}
    </p>
  </div>
</template>

<script setup>
import { client, requestCancelHandler } from '@/interceptors/client';
import { debounce } from 'lodash-es';
import { ref } from 'vue';

const error = ref('');

const inputSearch = ref('');
const searchCitizenResult = ref();
const selectCitizen = ref();
const searchRequestController = ref();

const triggerSearchCitizen = debounce(() => {
  if (inputSearch.value.length > 2) {
    searchRequestController.value?.abort();
    searchRequestController.value = requestCancelHandler();
    searchCitizen();
  }
}, 500);

const searchCitizen = () => {
  client
    .get(
      'citizens/globalSearch',
      { params: { search: inputSearch.value, all: 1 } },
      { signal: searchRequestController.value?.signal }
    )
    .then(res => {
      searchCitizenResult.value = res.data.data;
      searchRequestController.value = null;
    })
    .catch(err => {
      searchRequestController.value = null;
      if (err.code !== 'ERR_CANCELED') {
        error.value = err.response.data.message;
      }
    });
};

const selectThisCitizen = selection => {
  selectCitizen.value = selection;
};

const closeSuggestion = () => {
  searchCitizenResult.value = '';
};

const emit = defineEmits(['emitCitizenSearch']);
const triggerEmit = () => {
  emit('emitCitizenSearch', selectCitizen.value);
};
</script>

<style scoped>
#suggestion {
  background: rgba(255, 255, 255, 1);
  position: sticky;
  width: 80%;
  overflow: hidden;
  overflow-y: auto;
  border: 1px solid #bababa;
  padding: 1%;
  border-radius: 5px;
  cursor: pointer;
}

#suggestion-item li:hover {
  background-color: rgb(244, 244, 244);
}
</style>
