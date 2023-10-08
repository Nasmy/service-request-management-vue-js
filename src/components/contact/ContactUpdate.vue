<template>
  <ErrorMessage :error="error" @emit-closed="error = null" />
  <SuccessMessage :success="success" @emit-closed="success = null" />
  <div class="input-group mb-3">
    <input v-model="inputPosition" type="text" class="form-control" placeholder="Position" >       
    <input v-model="inputPhone" type="text" class="form-control" placeholder="Phone" >       
    <input v-model="inputMobile" type="text" class="form-control" placeholder="Mobile">       
    <input v-model="inputEmail" type="text" class="form-control" placeholder="Email">       
    <input v-model="inputAddress" type="text" class="form-control" placeholder="Address">       
    <input v-model="inputCity" type="text" class="form-control" placeholder="City">       
    <input v-model="inputZip" type="text" class="form-control" placeholder="Zip">       
  </div> 

  <div class="row mb-5">
      <button @click="updateContact" class="btn btn-secondary col-2 ms-2">
        Update Contact
      </button>
      <button @click="deleteContact"  class="btn btn-danger col-2 ms-2">
        Delete Contact
      </button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import client from "@/interceptors/client";

import SuccessMessage from "@/layouts/SuccessMessage.vue";
import ErrorMessage from "@/layouts/ErrorMessage.vue";

const error = ref("");
const success = ref();
const contactById = ref();

const inputPhone = ref();
const inputMobile = ref();
const inputEmail = ref();
const inputAddress = ref();
const inputZip = ref();
const inputCity = ref();
const inputPosition = ref();

const props = defineProps({
  id: Number,
});

const emit = defineEmits(['emitDeleteContact']);


const getContactById=()=> {
  client.get(`contacts/${props.id}`)
    .then((res) => {
      contactById.value = res.data.data;

      // Set default value
      inputPhone.value = contactById.value.phone;
      inputMobile.value = contactById.value.mobile;
      inputEmail.value = contactById.value.email;
      inputAddress.value = contactById.value.address;
      inputCity.value = contactById.value.city;
      inputZip.value = contactById.value.zip;
      inputPosition.value = contactById.value.position;
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });

}
getContactById();

const updateContact = () => {
  client
    .put(`contacts/${props.id}`, 
    {
      email: inputEmail.value,
      phone: inputPhone.value,
      mobile: inputMobile.value,
      address: inputAddress.value,
      city: inputCity.value,
      zip: inputZip.value,
      position: inputPosition.value
    })
    .then((res) => {
      success.value = res.data.message;
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });
}

const deleteContact = () => {
  client.delete(`contacts/${props.id}`)
    .then(() => {
      emit('emitDeleteContact')
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });
}

</script>
