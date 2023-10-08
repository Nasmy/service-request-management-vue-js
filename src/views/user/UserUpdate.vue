<template>
  <OneColumn>
    <template v-slot:col1>
      <UserUpdate :id="parseInt($route.params.id)"/>
    </template>
  </OneColumn>
</template>

<script setup>
import OneColumn from "@/layouts/OneColumn.vue";
import UserUpdate from "@/components/user/UserUpdate.vue";

</script>
