<template>

<OneColumn>
  <template v-slot:col1>
    <p class="display-6">Citizen Update</p>  
    <CitizenUpdate :id="parseInt($route.params.id)" />  
  </template>
</OneColumn>

</template>

<script setup>
import CitizenUpdate from "@/components/citizen/CitizenUpdate.vue"

import OneColumn from "@/layouts/OneColumn.vue";

</script>

