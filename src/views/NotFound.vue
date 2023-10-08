<template>
  <OneColumn>
    <template v-slot:col1>
      <div class="container">
        <h1>Error 404 : page not found</h1>
        <i class="bi bi-cone-striped"></i>
      </div>
    </template>
  </OneColumn>
</template>

<script setup>
import OneColumn from "@/layouts/OneColumn.vue";
</script>

<style scoped>
i {
  font-size: 90px;
}
</style>