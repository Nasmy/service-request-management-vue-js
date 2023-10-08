<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#contactCreate"
  >
    Create new Contact
  </button>

  <!-- Modal -->
  <div class="modal fade" id="contactCreate" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <i class="bi bi-building m-1"></i>
          <h5 class="modal-title" id="exampleModalLabel">Create new contact</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <ErrorMessage :error="error" @emit-closed="error = null" />
          <div class="row mt-3">
              <input
                v-model="inputAddress"
                type="text"
                class="form-control my-1"
                placeholder="Address ..."
              />
              <input
                v-model="inputCity"
                type="text"
                class="form-control my-1"
                placeholder="City..."
              />
              <input
                v-model="inputZip"
                type="text"
                class="form-control my-1"
                placeholder="Zip..."
              />
              <input
                v-model="inputPhone"
                type="text"
                class="form-control my-1"
                placeholder="Phone..."
              />
              <input
                v-model="inputMobile"
                type="text"
                class="form-control my-1"
                placeholder="Mobile..."
              />
              <input
                v-model="inputEmail"
                type="text"
                class="form-control my-1"
                placeholder="Email..."
              />
              <input
                v-model="inputPosition"
                type="text"
                class="form-control my-1"
                placeholder="Position..."
              />
          </div>
        </div>
        <div class="modal-footer">
          <button
            id="close-modal-contact"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            @click="createContact()"
            type="button"
            class="btn btn-primary"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import client from "@/interceptors/client";
import { ref } from "vue";
import ErrorMessage from "@/layouts/ErrorMessage.vue";

const props = defineProps({
  citizenId: Number,
});

const emit = defineEmits(['emitCreateContact']);

const error = ref("");

const inputPhone = ref();
const inputMobile = ref();
const inputEmail = ref();
const inputAddress = ref();
const inputCity = ref();
const inputZip = ref();
const inputPosition = ref();

const createContact = () => {
  client
    .post(
      `contacts`, 
      { 
        phone : inputPhone.value,
        mobile : inputMobile.value,
        email : inputEmail.value,
        address : inputAddress.value,
        city : inputCity.value,
        zip : inputZip.value,
        position : inputPosition.value,
        citizen_id : props.citizenId
      }
    ).
    then(()=> {
      // TODO : need to check if reset value is needed
      emit('emitCreateContact');
      document.getElementById("close-modal-contact").click();
    })
    .catch((err) => {
      error.value = err.response.data.data;
    });
};

</script>