import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Accueil',
      meta: { title: 'Accueil', public: true },
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/checkout',
      name: 'Checkout',
      meta: { title: 'Checkout', requiresAuth: true },
      component: () => import('../views/CheckoutView.vue')
    },
    {
      path: '/help',
      name: "Centre d'aide",
      meta: { title: "Centre d'aide", public: true },
      component: () => import('../views/HelpView.vue')
    },
    {
      path: '/profil',
      name: 'Profil',
      meta: { title: 'Profil', requiresAuth: true },
      component: () => import('../views/ProfilPage.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'Not Found',
      redirect: () => {
        return { path: '/' }
      }
    }
  ]
})

// Navigation guard pour la sécurité et la redirection
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  const defaultTitle = 'Pharmadoc'
  document.title = to.meta.title ? `${defaultTitle} - ${to.meta.title}` : defaultTitle

  // Récupération du store utilisateur
  const authStore = useAuthStore()
  authStore.showValidToast = false

  // Si l'utilisateur n'est pas connecté
  if (!authStore.user && !to.meta.public) {
    authStore.showLoginPopup = true
    return
  }

  // Si l'utilisateur est connecté mais non validé
  if (authStore.user && !authStore.user.valid && to.path !== '/profil') {
    authStore.showValidToast = true
    return next('/profil')
  }

  next()
})

export default router
