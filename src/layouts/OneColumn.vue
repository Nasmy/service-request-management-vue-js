<template>
  <div class="container my-2">
    <TheHeader />

    <div class="row">
      <div class="col">
        <slot name="col1"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheHeader from "@/layouts/TheHeader.vue";
</script>

