<template>
  <ErrorMessage :error="error" @emit-closed="error = null" />
  <SearchCitizenForTable @emitSearchCitizenResult="setSearch" />
  <CitizenRead v-if="citizenId" :id="citizenId" @emitClosed="handleCitizenReadClose()" />
  
  <el-table :data="api">
    <el-table-column label="Actions">
      <template #default="scope">
        <!-- read -->
        <i id="pointer" class="bi bi-eye m-1" @click="setCitizenIdToRead(scope.row.id)" ></i>  
        <!-- update -->
        <RouterLink
          type="button"
          :to="{
            name: 'CitizenUpdate',
            params: { id: scope.row.id },
          }"
        >
          <i class="bi bi-pencil m-1"> </i>
        </RouterLink>
        <!-- delete -->
        <i
          @click="deleteConfirmation(scope.row.id)"
          role="button"
          class="bi bi-trash m-1 text-danger"
        ></i>
      </template>
    </el-table-column>
    <el-table-column prop="id" label="ID" sortable />
    <el-table-column prop="gender" label="Gender" sortable />
    <el-table-column prop="firstname" label="First Name" sortable />
    <el-table-column prop="lastname" label="Last Name" sortable />
    <el-table-column prop="birthdate" label="Birthdate" sortable />
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
import client from "@/interceptors/client";
import { ref } from "vue";
import { RouterLink } from "vue-router";

import CitizenRead from "@/components/citizen/CitizenRead.vue";
import SearchCitizenForTable from "@/components/search/SearchCitizenForTable.vue";

import Pagination from "@/layouts/Pagination.vue";
import PaginationCounter from "@/layouts/PaginationCounter.vue";
import ErrorMessage from "@/layouts/ErrorMessage.vue";

const error = ref();
const api = ref();
const pagination = ref();
const citizenId = ref();

// citizen get
const getCitizen = () => {
  client
    .get("citizens")
    .then((res) => {
      api.value = res.data.data;
      pagination.value = res.data.pagination;
    })
    .catch((err) => {
      error.value = err.response.data.message;
    });
};
getCitizen();

// citizen read
const setCitizenIdToRead = (id) => {
  citizenId.value = id;
};

const handleCitizenReadClose = () => {
  citizenId.value = null;
};

// citizen delete
const deleteConfirmation = (id) => {
  if (confirm("Are you sure you want to delete ?") === true) {
    deleteCitizen(id);
  }
};

const deleteCitizen = (id) => {
  client
    .delete(`/citizens/${id}`)
    .then((res) => {
      getCitizen();
    })
    .catch((err) => {
      error.value = err.response.data;
    });
};

// citizen search
const setSearch = (result) => {
  api.value = result.data;
  pagination.value = result.pagination;
};

// emit from Pagination
const setPaginationResult = (value) => {
  api.value = value
}

const setPaginationLink = (value) => {
  pagination.value = value
}

</script>

<style scoped>
#pointer {
  cursor: pointer;
}
</style>