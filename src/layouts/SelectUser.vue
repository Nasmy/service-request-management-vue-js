<template>
<div>
  <ErrorMessage :error="error" @emit-closed="error = null" />
  <select v-model="userSelectedId" @change="triggerEmit" class="form-select mb-3"> 
    <option value="0">Select user</option>
    <option v-for="user in api" :key="user.id" :value="user.id"> {{user.username}}</option>
  </select>
</div>
</template>

<script setup>
import client from "@/interceptors/client";
import { ref } from "vue";
import ErrorMessage from "@/layouts/ErrorMessage.vue";

const api = ref();
const error = ref();
const userSelectedId = ref(0);

const getUser = () => {
  client
    .get(`users`)
    .then((res) => {
      api.value = res.data.data;
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });
};
getUser();

const emit = defineEmits(["emitSelectUserId"]);

const triggerEmit = () =>{
  emit("emitSelectUserId", userSelectedId.value);
}


</script>

