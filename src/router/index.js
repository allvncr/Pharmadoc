import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Accueil',
      meta: { title: 'Accueil' },
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/medicaments',
      name: 'Recherche',
      meta: { title: 'Recherche' },
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/help',
      name: "Centre d'aide",
      meta: { title: "Centre d'aide" },
      component: () => import('../views/HelpView.vue')
    }
  ]
})

// Navigation guard pour changer le titre de la page
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  const defaultTitle = 'Pharmadoc'
  document.title = to.meta.title ? `${defaultTitle} - ${to.meta.title}` : defaultTitle
  next()
})

export default router
