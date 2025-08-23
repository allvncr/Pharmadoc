import { defineStore } from 'pinia'
import { login, register, updateUser, getUserById, completeFile } from '@/services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    error: null,
    showLoginPopup: false,
    showValidToast: false
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await login(email, password)

        this.token = response.data.token
        this.user = {
          id: response.data.userId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          roles: response.data.roles || [],
          valid: response.data.valid
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

    async one_user(id) {
      this.loading = true
      this.error = null
      try {
        const { data } = await getUserById(this.token, id)
        this.user = data
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur lors de la récupération du médicament.'
      } finally {
        this.loading = false
      }
    },

    async updateUser(userData) {
      try {
        const response = await updateUser(this.token, userData)
        this.user = response.data
        localStorage.setItem('user', JSON.stringify(this.user))
        this.error = null
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          'Échec de la mise à jour des informations utilisateur. Essayez à nouveau.'
        throw this.error
      }
    },

    async completeFile(id, formData) {
      try {
        const response = await completeFile(this.token, id, formData)
        this.user = response.data
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
      window.location.href = '/'
    },

    openLoginPopup() {
      this.showLoginPopup = true
    }
  }
})
