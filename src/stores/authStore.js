import { defineStore } from 'pinia'
import { login, register, updateUser } from '@/services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    error: null,
    showLoginPopup: false
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await login(email, password)

        this.token = response.data.token
        this.user = {
          id: response.data.userId,
          firstname: response.data.firstName,
          lastname: response.data.lastName,
          email: response.data.email,
          roles: response.data.roles || []
        }

        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('token', JSON.stringify(this.token))
        this.error = null
      } catch (err) {
        this.error = err.response?.data?.message || 'Échec de la connexion. Essayez à nouveau.'
        throw this.error
      }
    },
    async register(userData) {
      try {
        await register(userData)
        this.error = null // Réinitialiser les erreurs
      } catch (err) {
        this.error = err.response?.data?.message || 'Échec de l’inscription. Essayez à nouveau.'
        throw this.error
      }
    },

    async updateUser(userData) {
      try {
        const response = await updateUser(this.token, userData)
        this.user = response.data.user
        localStorage.setItem('user', JSON.stringify(this.user))
        this.error = null
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          'Échec de la mise à jour des informations utilisateur. Essayez à nouveau.'
        throw this.error
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      window.location.href = '/login'
    },

    openLoginPopup() {
      this.showLoginPopup = true
    }
  }
})
