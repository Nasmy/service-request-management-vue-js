<template>
  <div class="col-8">
    <p class="display-6 mb-4">Create new role</p>
    <ErrorMessage :error="error" @emit-closed="error = null" />
    <h5>Role informations</h5>
    <div class="input-group mb-3">
      <span class="input-group-text">Name</span>
      <input type="text" class="form-control" v-model="inputName" required />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Ident</span>
      <input type="text" class="form-control" v-model="inputIdent" required />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Description</span>
      <input
        type="text"
        class="form-control"
        v-model="inputDescription"
        required
      />
    </div>

    <h5>Role permission</h5>

    <div v-if="componentLoader">
      <CheckAllCheckbox
        @emitCheckedAllCheckbox="getPermission"
        :arrayCheckboxData="listAllPermission"
      />
    </div>

    <div v-for="item in listAllPermission" :key="item.id">
      <input
        class="m-2"
        type="checkbox"
        :id="item.id"
        :value="item.id"
        v-model="inputPermission"
      />
      <label :for="item.id">
        ID: {{ item.id }} / {{ item.name }} / {{ item.parent }} /
        {{ item.child }}
      </label>
    </div>

    <div class="row mb-5">
      <button @click="createRole()" class="btn btn-primary col-3 ms-2">
        + Add new role
      </button>
      <CancelBtn class="col-3 ms-2" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import client from "@/interceptors/client";

import CancelBtn from "@/layouts/CancelBtn.vue";
import ErrorMessage from "@/layouts/ErrorMessage.vue";
import CheckAllCheckbox from "@/layouts/CheckAllCheckbox.vue";

const listAllPermission = ref();
const error = ref("");

const inputName = ref("");
const inputIdent = ref("");
const inputDescription = ref("");
const inputPermission = ref([]);

const componentLoader = ref(false);
onMounted(() => {
  componentLoader.value = true;
});

const getListPermission = () => {
  client
    .get("/permissions")
    .then((res) => {
      listAllPermission.value = res.data.data;
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });
};
getListPermission();

const getPermission = (value) => {
  inputPermission.value = value;
};

const createRole = () => {
  client
    .post(
      "/roles",
      {
        name: inputName.value,
        ident: inputIdent.value,
        description: inputDescription.value,
        permissions: inputPermission.value,
      }
    )
    .then((res) => {
      window.history.go(-1); 
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });
};
</script>
