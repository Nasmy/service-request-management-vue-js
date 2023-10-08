<template>
  <ErrorMessage :error="error" @emit-closed="error = null" />
  <SuccessMessage :success="success" @emit-closed="success = null" />
  <div class="row">
    <h5>Citizen</h5>
    <hr>
    <div class="input-group mb-3">
      <input v-model="inputFirstName" type="text" class="form-control" >        
      <input v-model="inputLastName" type="text" class="form-control" >        
      <input v-model="inputBirthdate" type="date" class="form-control" >                
      <select v-model="inputGender" class="form-select">
        <option selected>--Gender--</option>
        <option value="f">Miss</option>
        <option value="m">Mister</option>
        <option value="nb">Undefine</option>
      </select>
    </div>
  </div>

  <div class="row mb-5">
      <button @click="updateCitizen()" class="btn btn-secondary col-2 ms-2">
        Update Citizen
      </button>
  </div>

  <div class="row">
    <h5>Contacts</h5> 
    <hr>
    <div class="col-3 my-4">
      <ManualCreateContact :citizenId="props.id" @emitCreateContact="getCitizenById"/>
    </div>
    
    <template v-if="componentLoader">
      <div
        v-for="item in citizenById?.contacts"
        :key="item.id"
      >
        <h6>{{item.organization?.name}}</h6>
        <ContactUpdate :id="item?.id"  @emitDeleteContact="getCitizenById"/>
      </div>
    </template>
  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import client from "@/interceptors/client";
import ContactUpdate from "@/components/contact/ContactUpdate.vue";
import ManualCreateContact from "@/components/contact/ManualCreateContact.vue";

import SuccessMessage from "@/layouts/SuccessMessage.vue";
import ErrorMessage from "@/layouts/ErrorMessage.vue";

const error = ref("");
const success = ref();
const citizenById = ref();
const componentLoader = ref(false)

const inputFirstName = ref();
const inputLastName = ref();
const inputGender = ref();
const inputBirthdate = ref();

onMounted(() => {
  componentLoader.value = true;
});

const props = defineProps({
  id: Number,
});

const getCitizenById = ()=> {
  client.get(`citizens/${props.id}`)
    .then((res) => {
      citizenById.value = res.data.data;

      // Set default value
      inputFirstName.value = citizenById.value.firstname;
      inputLastName.value = citizenById.value.lastname;
      inputBirthdate.value = citizenById.value.birthdate;
      inputGender.value = citizenById.value.gender;
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });
}
getCitizenById();

const updateCitizen = () => {
  client.put(`citizens/${props.id}`,
    {
      firstname: inputFirstName.value,
      lastname: inputLastName.value,
      gender: inputGender.value,
      birthdate: inputBirthdate.value
    })
    .then((res) => {
      success.value = res.data.message;
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });
};

</script>