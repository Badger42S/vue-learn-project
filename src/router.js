import {
  createRouter,
  createWebHashHistory,
} from 'vue-router';

import CoachList from './pages/coaches/CoachList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestRecived from './pages/requests/RequestRecived.vue';
import AuthUsers from './pages/auth/AuthUsers.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachList },
    {
      path: '/coaches/:id',
      props: true,
      component: CoachDetail,
      children: [
        { path: 'contact', component: ContactCoach },
      ],
    },
    { path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestRecived, meta: { requiresAuth: true } },
    { path: '/auth', component: AuthUsers, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
