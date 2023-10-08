<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-secondary"
    data-bs-toggle="modal"
    data-bs-target="#citizenCreate"
  >
    Create new citizen
  </button>

  <!-- Modal -->
  <div class="modal fade" id="citizenCreate" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <i class="bi bi-person-circle m-1"></i>
          <h5 class="modal-title" id="exampleModalLabel">Create new citizen</h5>
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
            <div class="col">
              <input
                v-model="inputFirstName"
                type="text"
                required
                class="form-control"
                placeholder="Firstname"
              />
            </div>

            <div class="col">
              <input
                v-model="inputLastName"
                type="text"
                required
                class="form-control"
                placeholder="LastName"
              />
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <input
                v-model="inputBirthDate"
                type="date"
                class="form-control"
                placeholder="Date of birth"
              />
            </div>
            <div class="col-6">
              <select v-model="inputGender" class="form-select">
                <option selected>--Gender--</option>
                <option value="f">Miss</option>
                <option value="m">Mister</option>
                <option value="nb">Undefine</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            id="close-modal-citizen"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            @click="createCitizen()"
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

const error = ref("");

// citizen
const inputFirstName = ref();
const inputLastName = ref();
const inputGender = ref();
const inputBirthDate = ref();

const emit = defineEmits(["citizenCreated"]);

const createCitizen = () => {
  client
    .post("citizens", {
      firstname: inputFirstName.value,
      lastname: inputLastName.value,
      gender: inputGender.value,
      birthdate: inputBirthDate.value,
    })
    .then(response => {
      emit("citizenCreated", response.data.data);
      document.getElementById("close-modal-citizen").click();
    })
    .catch((err) => {
      error.value = err.response.data.data;
    });
};
</script>
