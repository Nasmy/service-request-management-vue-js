import axios from 'axios';
import httpStatus from 'http-status';
import { merge, pickBy } from 'lodash-es';

// we also import the auth service from the modules.
import { useAuthenticateStore } from '@/stores/authenticate';
import router from '@/router';

const config = {
  baseURL: import.meta.env.VITE_API_URL
};

/**
 * Creating the instance of Axios
 * It is because in large-scale application, we may need
 * to consume APIs from more than a single server,
 */
const client = axios.create(config);

/**
 * Auth interceptors
 * @description Add auth tokens to every outgoing request.
 * @param {*} config
 */

const authInterceptor = config => {
  const auth = useAuthenticateStore();
  config.baseURL = auth.BASE_URL;

  config.headers = pickBy(
    merge(
      {
        Authorization: `Bearer ${auth.token}`,
        'Access-Control-Allow-Origin': '*'
      },
      config.headers
    )
  );

  return config;
};

/**
 * Logger interceptors
 * @description Log app requests.
 * @param {*} config
 */
const loggerInterceptor = config => {
  /** TODO: Add logging here */
  return config;
};

/** Adding the request interceptors */
client.interceptors.request.use(authInterceptor);
client.interceptors.request.use(loggerInterceptor);

/** Adding the response interceptors */
client.interceptors.response.use(
  response => Promise.resolve(response),
  error => {
    switch (error.response?.status) {
      case httpStatus.UNAUTHORIZED:
        // if token revoked redirect to login because you can't logout when you are not login
        if (!error.config?.isLoginRequest) {
          const auth = useAuthenticateStore();
          auth.clearState();
          window.location.href = '/login';
        }
        break;
      case httpStatus.NOT_FOUND:
        router.push({ name: 'NotFound' });
        break;
      case 0:
        return Promise.reject(new Error('Something went wrong, please try again.'));
    }

    throw error;
  }
);

function requestCancelHandler() {
  return new window.AbortController();
}

export { requestCancelHandler, client };
export default client;
