<template>
  <nav class="fs-5 d-flex flex-column ">
    <RouterLink class="link-dark m-2" to="/">
      <i class="d-none d-md-inline-block bi bi-kanban"></i>
      {{ $t('menu.Dashboard') }}
    </RouterLink>

    <RouterLink class="link-dark m-2" to="/job-create">
      <i class="d-none d-md-inline-block bi bi-plus-circle"></i>
      {{ $t('menu.Add request')}}
    </RouterLink>

    <RouterLink class="link-dark m-2" to="/citizen-dashboard">
      <i class="d-none d-md-inline-block bi bi-people"></i>
      {{ $t('menu.Citizen')}}
    </RouterLink>

    <RouterLink class="link-dark m-2" to="/archiving">
      <i class="d-none d-md-inline-block bi bi-archive"></i>
      {{ $t('menu.Archive')}}
    </RouterLink>

    <a
      class="m-2 link-dark"
      role="button"
      data-bs-toggle="collapse" 
      aria-expanded="false"
      href="#collapseConfig" 
      data-bs-target="#collapseConfig"
      aria-controls="collapseConfig">
      <i class="d-none d-md-inline-block bi bi-gear"></i>
      {{ $t('menu.Settings')}}
    </a>
    <RouterLink id="collapseConfig" class="link-dark ms-4" to="/user-dashboard">
      {{ $t('menu.Users')}}
    </RouterLink>
    <RouterLink id="collapseConfig" class="link-dark ms-4" to="/role-dashboard">
      {{ $t('menu.Roles')}}
    </RouterLink>
    
    <RouterLink class="link-dark m-2" to="#">
      <i class="d-none d-md-inline-block bi bi-life-preserver"></i>
      {{ $t('menu.Help')}}
    </RouterLink>
    
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
nav a {
  text-decoration: none;
  white-space: nowrap;
  display: block;
}
</style>