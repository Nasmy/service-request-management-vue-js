<template>
  <OneColumn>
    <template v-slot:col1> 
      <p class="display-6 mb-4">{{ $t('citizen.Citizen')}}</p>
     
      <div class="row">
        <div class="col-2 m-1">
          <RouterLink 
            to="/citizen-create" 
            class="btn btn-primary"
            role="button" >
            + Add citizen
          </RouterLink>
        </div>
      </div>

      <CitizenTable />
    </template>
  </OneColumn>
</template>

<script setup>
import CitizenTable from '@/components/citizen/CitizenTable.vue'

import OneColumn from "@/layouts/OneColumn.vue";


</script>
