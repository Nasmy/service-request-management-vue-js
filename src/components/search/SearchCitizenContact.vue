<template>
<div class="row">
  <div class="col-6">
    <SearchCitizen @emitCitizenSearch="setCitizen"/>
  </div>

  <div class="col-6">
    <select v-model="selectContactId"  @change="triggerEmit" class="form-select mb-3"> 
      <option value="0">Select contact information</option>
      <option v-for="contact in allCitizenContact" :key="contact.id" :value="contact.id"> 
        {{contact?.position}}
        {{contact?.email}} 
        {{contact?.mobile}} 
        {{contact?.phone}} 
        {{contact?.address}} 
        {{contact?.zip}}
      </option>
    </select>
  </div>
  
</div>
</template>

<script setup>
import { ref } from 'vue';

import SearchCitizen from '@/components/search/SearchCitizen.vue'

const selectCitizen = ref();
const allCitizenContact = ref();
const selectContactId = ref(0);

// get citizen 
const setCitizen = value => {
  selectCitizen.value = value;
  allCitizenContact.value = value.contacts;
}

// emit contact
const emit = defineEmits(['emitContact']);
const triggerEmit = () => {
  emit('emitContactId', selectContactId.value);
};
</script>

