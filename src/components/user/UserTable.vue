<template>
  <ErrorMessage :error="error" @emit-closed="error = null" />
  <el-table :data="api">
    <el-table-column label="Actions">
      <template #default="scope">
        <RouterLink
          type="button"
          :to="{
            name: 'UserUpdate',
            params: { id: scope.row.id },
          }"
        >
          <i class="bi bi-pencil m-1"> </i>
        </RouterLink>
        <i
          @click="deleteConfirmation(scope.row.id)"
          role="button"
          class="bi bi-trash m-3 text-danger"
        ></i>
      </template>
    </el-table-column>
    <el-table-column prop="id" label="ID" sortable />
    <el-table-column prop="username" label="Username" sortable />
    <el-table-column prop="first_name" label="First Name" sortable />
    <el-table-column prop="last_name" label="Last Name" sortable />
    <el-table-column prop="role.name" label="Role" sortable />
    <el-table-column prop="created_at" label="Create" sortable />
    <el-table-column prop="updated_at" label="Update" sortable />
  </el-table>
  
  <template v-if="pagination">
    <PaginationCounter 
      :pagination="pagination"
    />
    <Pagination 
      :paginationData="pagination"
      @emitPaginationResult="setPaginationResult"
      @emitPaginationLink="setPaginationLink"
    />
  </template>
  
</template>
  
<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import client from "@/interceptors/client";

import ErrorMessage from "@/layouts/ErrorMessage.vue";
import Pagination from "@/layouts/Pagination.vue";
import PaginationCounter from "@/layouts/PaginationCounter.vue";


const error = ref();
const api = ref();
const pagination = ref();

const getUser = () => {
  client
    .get("/users")
    .then((res) => {
      api.value = res.data.data;
      pagination.value = res.data.pagination;
    })
    .catch((err) => {
      error.value = err.response.data.message
    });
};
getUser();

const deleteConfirmation = (id) => {
  if (confirm("Are you sure you want to delete ?") == true) {
    deleteUser(id);
  }
};

const deleteUser = (id) => {
  client.delete(`/users/${id}`)
    .then((res) => {
      getUser();
    })
    .catch((err) => {
      error.value = err.response.data;
    });
};

// emit from Pagination
const setPaginationResult = (value) => {
  api.value = value
}

const setPaginationLink = (value) => {
  pagination.value = value
}


</script>
