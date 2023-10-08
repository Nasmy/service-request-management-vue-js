<template>
  <OneColumn>
    <template v-slot:col1>
      <JobDetail :job-id="+$route.params.id" />
    </template>
  </OneColumn>
</template>

<script setup>
import OneColumn from '@/layouts/OneColumn.vue';

import JobDetail from '@/components/job/JobDetail.vue';
</script>

<style scoped></style>
