
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'test', component: () => import('pages/Test.vue')},
      { path: 'class', component: () => import('pages/Class.vue')},
      { path: 'class2', component: () => import('pages/Class2.vue')},
      { path: '78stem', component: () => import('pages/78Stem.vue')},
      { path: 'csd', component: () => import('pages/csd.vue')},
      { path: '5c1', component: () => import('pages/5c1.vue')},
      { path: 'student/:classID/:id', component: () => import('pages/Student.vue')},
      { path: 'class/:classID/', component: () => import('pages/ClassGen.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
