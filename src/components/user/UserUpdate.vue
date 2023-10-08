<template>
  <div class="container">
    <p class="display-6 mb-4">User Update: {{userById.username}}</p>
    <ErrorMessage :error="error" @emit-closed="error = null" />
    <div class="col-6">
      <i class="bi bi-diagram-3-fill"></i>
      <select v-model="roleSelected" class="form-select" aria-label="Select your role">
        <option disabled value="">Select role</option>
        <option v-for="role in roleList" :key="role.id" :value="role.id">
        {{role.name}}
        </option>
      </select>
    </div>

    <div class="row col-6">
    <i class="bi bi-lock-fill"></i>
      <div class="input-group mb-3 ">
        <span class="input-group-text">Username</span>
        <input :placeholder="userById.username" type="text" class="form-control" v-model="inputUsername" required/>
      </div>
    </div>

    <div class="row">
    <i class="bi bi-person-circle"></i>
      <div class="input-group mb-3 col">
        <span class="input-group-text">First Name</span>
        <input :placeholder="userById.first_name" type="text" class="form-control" v-model="inputFirst_name" required/>
      </div>
      <div class="input-group mb-3 col">
        <span class="input-group-text">Last Name</span>
        <input :placeholder="userById.last_name" type="text" class="form-control" v-model="inputLast_name" required/>
      </div>
    </div>

    <div class="row">
      <div class="input-group mb-3 col">
        <span class="input-group-text">Email</span>
        <input :placeholder="userById.email" type="email" class="form-control" v-model="inputEmail" required/>
      </div>
      <div class="input-group mb-3 col">
        <span class="input-group-text">Mobile</span>
        <input :placeholder="userById.mobile" type="tel" class="form-control" v-model="inputMobile" required/>
      </div>
    </div>

    <div class="row">
    <i class="bi bi-house-fill"></i>
      <div class="input-group mb-3 col">
        <span class="input-group-text">Address</span>
        <input :placeholder="userById.address" type="text" class="form-control" v-model="inputAddress" required />
      </div>
      <div class="input-group mb-3 col">
        <span class="input-group-text">City</span>
        <input :placeholder="userById.city" type="text" class="form-control" v-model="inputCity" required />
      </div>
      <div class="input-group mb-3 col">
        <span class="input-group-text">Zip</span>
        <input :placeholder="userById.zip" type="text" class="form-control" v-model="inputZip" required />
      </div>
    </div>

    <div class="row mb-5">
      <button @click="updateUser()" class="btn btn-primary col-2 ms-2">
        Update User
      </button>
      <CancelBtn class="col-2 ms-2" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import client from "@/interceptors/client";

import CancelBtn from "@/layouts/CancelBtn.vue";
import ErrorMessage from "@/layouts/ErrorMessage.vue";

const props = defineProps({
  id: Number,
});

const error = ref("");

const roleList = ref("");
const userById = ref("")
const roleSelected = ref("")

const inputUsername = ref("");
const inputFirst_name = ref("");
const inputLast_name = ref("");
const inputEmail = ref("");
const inputMobile = ref("");
const inputAddress = ref("");
const inputCity = ref("");
const inputZip = ref("");

const getRoleList = () => {
  client.get("roles")
    .then((res) => {
      roleList.value = res.data.data;
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });
};
getRoleList();

const getUserById=()=> {
  client.get(`users/${props.id}`)
    .then((res) => {
      userById.value = res.data.data;

      // Set default value
      inputUsername.value = userById.value.username;
      inputFirst_name.value = userById.value.first_name;
      inputLast_name.value = userById.value.last_name;
      inputEmail.value = userById.value.email;
      inputMobile.value = userById.value.mobile;
      inputAddress.value = userById.value.address;
      inputCity.value = userById.value.city;
      inputZip.value = userById.value.zip

      roleSelected.value = userById.value.role?.id;
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });

}
getUserById();

const updateUser = () => {
  client.put(`users/${props.id}`,
    {
      username: inputUsername.value,
      role_id: roleSelected.value,
      first_name: inputFirst_name.value,
      last_name: inputLast_name.value,
      email: inputEmail.value,
      mobile: inputMobile.value,
      city: inputCity.value,
      zip: inputZip.value,
      address: inputAddress.value,
    })
    .then((res) => {
      window.history.go(-1);
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });
};
</script>


<style scoped>
i {
  font-size: 2rem;
}
</style>
