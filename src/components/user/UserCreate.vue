<template>
  <div class="container">
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

    <div class="row">
    <i class="bi bi-lock-fill"></i>
      <div class="input-group mb-3 col">
        <span class="input-group-text">Username</span>
        <input type="text" class="form-control" v-model="inputUsername" required/>
      </div>
      <div class="input-group mb-3 col">
        <span class="input-group-text">Password</span>
        <input type="password" class="form-control" v-model="inputPassword" required/>
      </div>
    </div>
    <div class="row col-6">
      <div class="input-group mb-3">
        <span class="input-group-text">Password Confirmation</span>
        <input type="password" class="form-control" v-model="inputPassword_confirmation" required/>
      </div>
    </div>

    <div class="row">
    <i class="bi bi-person-circle"></i>
      <div class="input-group mb-3 col">
        <span class="input-group-text">First Name</span>
        <input type="text" class="form-control" v-model="inputFirst_name" required/>
      </div>
      <div class="input-group mb-3 col">
        <span class="input-group-text">Last Name</span>
        <input type="text" class="form-control" v-model="inputLast_name" required/>
      </div>
    </div>

    <div class="row">
      <div class="input-group mb-3 col">
        <span class="input-group-text">Email</span>
        <input type="email" class="form-control" v-model="inputEmail" required/>
      </div>
      <div class="input-group mb-3 col">
        <span class="input-group-text">Mobile</span>
        <input type="tel" class="form-control" v-model="inputMobile" required/>
      </div>
    </div>

    <div class="row">
    <i class="bi bi-house-fill"></i>
      <div class="input-group mb-3 col">
        <span class="input-group-text">Address</span>
        <input type="text" class="form-control" v-model="inputAddress" required />
      </div>
      <div class="input-group mb-3 col">
        <span class="input-group-text">City</span>
        <input type="text" class="form-control" v-model="inputCity" required />
      </div>
      <div class="input-group mb-3 col">
        <span class="input-group-text">Zip</span>
        <input type="text" class="form-control" v-model="inputZip" required />
      </div>
    </div>

    <div class="row mb-5">
      <button @click="createUser()" class="btn btn-primary col-2 ms-2">
        + Add new user
      </button>
      <CancelBtn class="col-2 ms-2" />
    </div>
  </div>
</template>

<script setup>
import client from "@/interceptors/client";
import { ref } from "vue";

import CancelBtn from "@/layouts/CancelBtn.vue";
import ErrorMessage from "@/layouts/ErrorMessage.vue";

const error = ref("");

const roleList = ref("");
const roleSelected = ref("")

const inputUsername = ref("");
const inputPassword = ref("");
const inputPassword_confirmation = ref("");
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

const createUser = () => {
  client.post("users",
    {
      username: inputUsername.value,
      role_id: roleSelected.value,
      password: inputPassword.value,
      password_confirmation: inputPassword_confirmation.value,
      first_name: inputFirst_name.value,
      last_name: inputLast_name.value,
      email: inputEmail.value,
      mobile: inputMobile.value,
      city: inputCity.value,
      zip: inputZip.value,
      address: inputAddress.value
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
