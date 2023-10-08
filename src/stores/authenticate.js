import { defineStore } from 'pinia';
import client from '@/interceptors/client';

/**
 * @description Consider subdomain as tenant
 * @returns tenant id
 */
export function tenant() {
  const host = window.location.host;
  const parts = host.split('.');
  return parts[0];
}

export const useAuthenticateStore = defineStore(`${tenant()}_auth`, {
  state: () => {
    return {
      BASE_URL: import.meta.env.VITE_API_URL + tenant() + '/', // set tenant to base url of api
      isAuthenticate: false,
      token: '',
      username: ''
    };
  },
  actions: {
    async login(credentials) {
      const BASE_URL = import.meta.env.VITE_API_URL + tenant() + '/';
      return client.post(BASE_URL + 'auth', {}, { auth: credentials, isLoginRequest: true }).then(res => {
        this.BASE_URL = BASE_URL;
        this.username = res.data.data.user.username;
        this.token = res.data.data.token;
        this.isAuthenticate = true;
      });
    },
    logout() {
      const BASE_URL = import.meta.env.VITE_API_URL + tenant() + '/';
      return client
        .post(BASE_URL + 'logout', {})
        .then(this.clearState.bind(this))
        .catch(err => {
          console.log(err);
        });
    },
    clearState() {
      this.BASE_URL = this.username = this.token = null;
      this.isAuthenticate = false;
    }
  },
  // used by pinia-plugin-persistedstate
  persist: true
});
