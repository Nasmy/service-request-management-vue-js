<template>
  <div class="row">
    <div class="col-9"></div>

    <div class="col-2 d-flex justify-content-center align-items-center">
      <LangSwitcher />
    </div>

    <div class="col-1">
      <Profil />
    </div>
  </div>
</template>

<script setup>
import Profil from "@/components/Profil.vue";
import LangSwitcher from "@/components/LangSwitcher.vue";
</script>

