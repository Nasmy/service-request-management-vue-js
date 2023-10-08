<template>

<OneColumn>
  <template v-slot:col1>
    <p class="display-6">Add citizen</p>
    <CitizenCreate/>    

  </template>
</OneColumn>

</template>

<script setup>
import { RouterLink } from "vue-router";

import OneColumn from "@/layouts/OneColumn.vue";
import CitizenCreate from "@/components/citizen/CitizenCreate.vue"
</script>

<style>

</style>