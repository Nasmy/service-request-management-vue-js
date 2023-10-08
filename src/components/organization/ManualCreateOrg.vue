<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-secondary"
    data-bs-toggle="modal"
    data-bs-target="#organizationCreate"
  >
    Create new Organization
  </button>

  <!-- Modal -->
  <div class="modal fade" id="organizationCreate" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <i class="bi bi-building m-1"></i>
          <h5 class="modal-title" id="exampleModalLabel">Create new Organization</h5>
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
                v-model="inputOrganizationName"
                type="text"
                required
                class="form-control"
                placeholder="Organization"
              />
          </div>
        </div>
        <div class="modal-footer">
          <button
            id="close-modal-organization"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            @click="createOrganization()"
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

// org
const inputOrganizationName = ref();

const createOrganization = () => {
  client
    .post("organizations", {
      name: inputOrganizationName.value,
    }).
    then(()=> {
      document.getElementById("close-modal-organization").click();
    })
    .catch((err) => {
      error.value = err.response.data.data;
    });
};
</script>
