<template>
  <OneColumn>
    <template v-slot:col1>
      <p class="display-6 mb-4">Create new user</p>
      <UserCreate/>
    </template>
  </OneColumn>
</template>


<script setup>
import OneColumn from "@/layouts/OneColumn.vue"
import UserCreate from "@/components/user/UserCreate.vue"

</script>
