<script setup>
import { RouterView } from "vue-router";
import Logo from "@/layouts/Logo.vue";
import TheMenu from "@/layouts/TheMenu.vue";
</script>

<template>
  <div class="row">
    <header class="col-sm-3 col-lg-2 col-3 bg-light">
      <div class="m-2">
        <Logo />
        <TheMenu />
      </div>
    </header>
    <main class="col-sm-9 col-lg-10 col-9">
      <RouterView />
    </main>
  </div>
</template>



<style scoped>
header {
  flex-grow: 1;
  min-height: 100vh;
}
</style>

