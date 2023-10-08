<template>
  <div class="dropdown">
    <button
      class="btn dropdown-toggle"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="bi bi-person"></i>
    </button>
    <p class="text-center">{{ auth.username }}</p>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li><a class="dropdown-item" href="#">Profil</a></li>
      <li>
        <a class="dropdown-item" href="#" @click="logOut()">Log Out</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import router from '@/router';

import { useAuthenticateStore } from '@/stores/authenticate';
const auth = useAuthenticateStore();

const logOut = async () => {
  await auth.logout();
  router.push({ name: 'TheLogin' });
};
</script>

<style scoped>
i {
  font-size: 1.4rem;
}
</style>
