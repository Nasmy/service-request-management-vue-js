<template>
  <div class="text-center">
    <main class="form-signin">
      <form id="login_form" @submit.prevent="logIn()">
        <img id="logo" class="img-fluid m-4" src="../assets/logo.png" />
        <ErrorMessage :error="error" @emit-closed="error = null" />
        <div class="form-floating">
          <input type="user" v-model="user" class="form-control" id="floatingInput" placeholder="user" />
          <label for="floatingInput">User</label>
        </div>
        <div class="form-floating">
          <input type="password" v-model="password" class="form-control" id="floatingPassword" placeholder="Password" />
          <label for="floatingPassword">Password</label>
        </div>
        <button class="w-100 btn btn-lg btn-dark" type="submit">Log in</button>
      </form>
    </main>
    <footer class="pt-3 mt-4 text-muted fw-lighter d-flex justify-content-center">
      &copy; DigitaleBox. All Rights Reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';

import ErrorMessage from '@/layouts/ErrorMessage.vue';

import { useAuthenticateStore } from '@/stores/authenticate';

const user = ref('');
const password = ref('');
const error = ref('');
const authStore = useAuthenticateStore();

function logIn() {
  authStore
    .login({ username: user.value, password: password.value })
    .then(() => {
      router.push({ name: 'JobDashboard' });
    })
    .catch(err => {
      console.log(err.response);
      error.value = err.response.data.message;
    });
}
</script>

<style scoped>
#logo {
  width: 100px;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type='user'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
