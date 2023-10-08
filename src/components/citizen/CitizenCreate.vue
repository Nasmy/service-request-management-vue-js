<template>
  <ErrorMessage :error="error" @emit-closed="error = null" />
  <SuccessMessage :success="success" @emit-closed="success = null" />
  <div class="row">
    <h5>Citizen</h5>
    <hr>
    <div class="col-9 mt-3">
      <SearchCitizen @emitCitizenSearch="setCitizen"/>
    </div>
    <div class="col-3 mt-3"><ManualCreateCitizen /></div>
  </div>

  <div class="row mt-4">
    <h5>Organization</h5>
    <hr>
    <div class="col-9 mt-3">
      <SearchOrganization @emitOrganizationSearch="setOrganization"/>
    </div>
    <div class="col-3 mt-3"><ManualCreateOrg /></div>
  </div>

   <div class="row mt-4">
    <h5>Contact</h5>
    <hr>
    
    <div class="input-group mb-3">
      <input v-model="inputPhone" type="text" class="form-control" placeholder="phone">        
      <input v-model="inputMobile" type="text" class="form-control" placeholder="mobile">        
      <input v-model="inputEmail" type="text" class="form-control" placeholder="email">        
    </div>
    <div class="input-group mb-3">
      <input v-model="inputAddress" type="text" class="form-control" placeholder="address">        
      <input v-model="inputCity" type="text" class="form-control" placeholder="city">        
      <input v-model="inputZip" type="text" class="form-control" placeholder="zip">        
    </div>
    <div class="col-4">
      <input v-model="inputPosition" type="text" class="form-control" placeholder="Position">
    </div>
  </div>
  <div class="row col-2 m-1">
    <button @click="createContacts" type="button" class="btn btn-primary">Create</button>
  </div>

</template>

<script setup>
import client from "@/interceptors/client";
import { ref } from "vue";
import ErrorMessage from "@/layouts/ErrorMessage.vue";
import SuccessMessage from "@/layouts/SuccessMessage.vue";

import SearchCitizen from "@/components/search/SearchCitizen.vue";
import SearchOrganization from "@/components/search/SearchOrganization.vue";
import ManualCreateCitizen from "@/components/citizen/ManualCreateCitizen.vue";
import ManualCreateOrg from "@/components/organization/ManualCreateOrg.vue";

const error = ref("");
const success = ref();

// emit citizen
const citizen = ref(0);
const setCitizen = (item) => {
  citizen.value = item
}
// emit org
const organization = ref(0);
const setOrganization = (item) => {
  organization.value = item
}

// contact
const inputMobile = ref();
const inputPhone = ref();
const inputEmail = ref();
const inputAddress = ref();
const inputZip = ref();
const inputCity = ref();
const inputPosition = ref();


const createContacts = () => {
  client.post("contacts",
    {
      email: inputEmail.value,
      mobile: inputMobile.value,
      phone: inputPhone.value,
      address: inputAddress.value,
      city: inputCity.value,
      zip: inputZip.value,
      position: inputPosition.value,
      citizen_id: citizen.value.id,
      organization_id: organization.value.id
    }
    )
    .then(() => {
      success.value = "Contact created !"
    })
    .catch((err) => {
      error.value = err.response.data.data;
    });
};

</script>
