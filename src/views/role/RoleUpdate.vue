<template>
  <OneColumn>
    <template v-slot:col1>
      <RoleUpdatePermission :id="parseInt($route.params.id)" />
    </template>
  </OneColumn>
</template>

<script setup>
import OneColumn from "@/layouts/OneColumn.vue";
import RoleUpdatePermission from "@/components/role/RoleUpdatePermission.vue";
</script>
