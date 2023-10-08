<template>
  <OneColumn>
    <template v-slot:col1>
      <p class="display-6">{{$t("Add request")}}</p>
      <JobCreate />
    </template>
  </OneColumn>
</template>

<script setup>
import OneColumn from "@/layouts/OneColumn.vue";
import JobCreate from "@/components/job/JobCreate.vue";
</script>
