<template>
  <OneColumn>
    <template v-slot:col1>
      <p class="display-6 mb-4">User</p>

      <RouterLink to="/user-create" class="btn btn-primary">
        + Add new user
      </RouterLink>

      <User-Table />

    </template>
  </OneColumn>
</template>

<script setup>
import OneColumn from "@/layouts/OneColumn.vue";
import { RouterLink } from "vue-router";
import UserTable from "@/components/user/UserTable.vue";

</script>
