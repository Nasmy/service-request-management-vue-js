<template>
  <OneColumn>
    <template v-slot:col1>
      <p class="display-6 mb-4">Roles</p>

      <RouterLink to="/role-create" class="btn btn-primary">
        + Add new role
      </RouterLink>

      <RoleTable />
    </template>
  </OneColumn>
</template>

<script setup>
import OneColumn from "@/layouts/OneColumn.vue";
import { RouterLink } from "vue-router";
import RoleTable from "@/components/role/RoleTable.vue";
</script>

