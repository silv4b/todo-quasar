/*jshint esversion: 11*/

const routes = [
  {
    path: '/todo',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/todo', component: () => import('src/pages/Todo.vue') },
      { path: '/help', component: () => import('src/pages/Help.vue') },
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '/', component: () => import('src/pages/Login.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
