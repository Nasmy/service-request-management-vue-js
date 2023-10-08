<template>
  <div class="col-8">
    <p class="display-6 mb-4">Update role : {{ roleById.name }}</p>
    <ErrorMessage :error="error" @emit-closed="error = null" />
    <h5>Role informations</h5>
    <div class="input-group mb-3">
      <span class="input-group-text">Name</span>
      <input
        type="text"
        class="form-control"
        v-model="inputName"
        required
        :placeholder="roleById.name"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Ident</span>
      <input
        type="text"
        class="form-control"
        v-model="inputIdent"
        required
        :placeholder="roleById.ident"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Description</span>
      <input
        type="text"
        class="form-control"
        v-model="inputDescription"
        required
        :placeholder="roleById.description"
      />
    </div>

    <h5>Role permission</h5>
    <div v-if="componentLoader">
      <CheckAllCheckbox
        @emitCheckedAllCheckbox="checkAll"
        :arrayCheckboxData="listAllPermission"
      />
    </div>
    <div v-for="item in listAllPermission" :key="item.id">
      <input
        class="m-2"
        type="checkbox"
        :id="item.id"
        :value="item.id"
        v-model="checkedPermission"
      />
      <label :for="item.id">
        ID: {{ item.id }} / {{ item.ident }} / Status:
        {{ item.active }}
      </label>
    </div>

    <button type="button" class="btn btn-primary" @click="updateRoleById()">
      Save changes
    </button>
    <CancelBtn class="ms-2" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import client from "@/interceptors/client";

import CancelBtn from "@/layouts/CancelBtn.vue";
import ErrorMessage from "@/layouts/ErrorMessage.vue";
import CheckAllCheckbox from "@/layouts/CheckAllCheckbox.vue";

const props = defineProps({
  id: Number,
});

const error = ref();

const listAllPermission = ref([]);
const roleById = ref([]);

const inputIdent = ref("");
const inputDescription = ref("");
const inputName = ref("");
const checkedPermission = ref([]);

const componentLoader = ref(false);
onMounted(() => {
  componentLoader.value = true;
});

const getRoleById = () => {
  client
    .get(`/roles/${props.id}`)
    .then((res) => {
      roleById.value = res.data.data;
      // Set default value
      inputName.value = roleById.value.name;
      inputIdent.value = roleById.value.ident;
      inputDescription.value = roleById.value.description;
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });
};
getRoleById();

const getListAllPermission = () => {
  client
    .get("/permissions")
    .then((res) => {
      listAllPermission.value = res.data.data;
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });
};
getListAllPermission();

const checkAll = (value) => {
  checkedPermission.value = value;
};

const getPermissionListById = () => {
  client
    .get(`/roles/${props.id}/permissions`)
    .then((res) => {
      checkedPermission.value = res.data.data.map((object) => object.id);
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });
};
getPermissionListById();

const updateRoleById = () => {
  client
    .put(
        `/roles/${props.id}`,
      {
        name: inputName.value,
        ident: inputIdent.value,
        description: inputDescription.value,
        active: true,
        permissions: checkedPermission.value,
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
