import { createRouter, createWebHistory } from 'vue-router';
import { useAuthenticateStore } from '@/stores/authenticate';

import TheLogin from '@/views/TheLogin.vue';
import NotFound from '@/views/NotFound.vue';

import JobCreate from '@/views/job/JobCreate.vue';
import JobDashboard from '@/views/job/JobDashboard.vue';
import JobDetail from '@/views/job/JobDetail.vue';
import Archiving from '@/views/Archiving.vue';

import CitizenCreate from '@/views/citizen/CitizenCreate.vue';
import CitizenDashboard from '@/views/citizen/CitizenDashboard.vue';
import CitizenUpdate from '@/views/citizen/CitizenUpdate.vue';

import RoleCreate from '@/views/role/RoleCreate.vue';
import RoleDashboard from '@/views/role/RoleDashboard.vue';
import RoleUpdate from '@/views/role/RoleUpdate.vue';

import UserCreate from '@/views/user/UserCreate.vue';
import UserDashboard from '@/views/user/UserDashboard.vue';
import UserUpdate from '@/views/user/UserUpdate.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'TheLogin',
      component: TheLogin,
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'JobDashboard',
      component: JobDashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/job-create',
      name: 'JobCreate',
      component: JobCreate,
      meta: { requiresAuth: true }
    },
    {
      path: '/archiving',
      name: 'Archiving',
      component: Archiving,
      meta: { requiresAuth: true }
    },
    {
      path: '/job-details/:id',
      name: 'JobDetails',
      component: JobDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/citizen-update/:id',
      name: 'CitizenUpdate',
      component: CitizenUpdate,
      meta: { requiresAuth: true }
    },
    {
      path: '/citizen-create',
      name: 'CitizenCreate',
      component: CitizenCreate,
      meta: { requiresAuth: true }
    },
    {
      path: '/citizen-dashboard',
      name: 'CitizenDashboard',
      component: CitizenDashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/role-dashboard',
      name: 'RoleDashboard',
      component: RoleDashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/role-create',
      name: 'RoleCreate',
      component: RoleCreate,
      meta: { requiresAuth: true }
    },
    {
      path: '/role-update/:id',
      name: 'RoleUpdate',
      component: RoleUpdate,
      meta: { requiresAuth: true }
    },
    {
      path: '/user-dashboard',
      name: 'UserDashboard',
      component: UserDashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/user-create',
      name: 'UserCreate',
      component: UserCreate,
      meta: { requiresAuth: true }
    },
    {
      path: '/user-update/:id',
      name: 'UserUpdate',
      component: UserUpdate,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const authenticate = useAuthenticateStore();
  const isNotAuthenticate = !authenticate.isAuthenticate;
  // make sure the user is authenticated avoid infinite loop
  if (to.meta.requiresAuth && isNotAuthenticate) {
    return next({ name: 'TheLogin' });
  }
  if (to.name === 'TheLogin' && !isNotAuthenticate) {
    return next({ name: 'JobDashboard' });
  }
  next();
});

export default router;
