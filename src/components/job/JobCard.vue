<template>
  <div class="card m-3">
    <div class="card-body">
      <p class="card-title fw-bold">{{id}}# {{ title }}</p>
      <p id="description" class="text-muted fw-light">
        {{ contact }} | {{ dateStart }}
      </p>
      <p id="description" class="text-muted fw-light">
        {{ note }} 
      </p>
      <div class="row">
        <div class="col d-flex justify-content-end">
          <div class="dropdown">
            <button
              class="btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
            <i class="bi bi-gear"></i>
            </button>
            <ul class="dropdown-menu">
              <li><RouterLink class="dropdown-item" :to="{ name: 'JobDetails', params: { id} }">Editer</RouterLink></li>
              <li><a class="dropdown-item text-danger" @click="deleteConfirmation(id) ">Supprimer</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import client from '@/interceptors/client';

const error = ref();


defineProps({
  id: Number,
  title: String,
  contact: String,
  dateStart: String,
  note: String
});

// emit delete to parent
const emit = defineEmits(['emitDeleteJob']);
const triggerEmit = () => {
  emit('emitDeleteJob');
};

// delete logic
const deleteConfirmation = (id) => {
  if (confirm("Are you sure you want to delete ?") === true) {
    deleteThisJob(id);
  }
};

const deleteThisJob = (id) => {
  client
    .delete(`jobs/${id}`)
    .then(() => {
      triggerEmit()
     })
    .catch((err) => {
      error.value = err.response.data;
    });

}

</script>

<style scoped>
#description {
  font-size: 14px;
}
</style>
