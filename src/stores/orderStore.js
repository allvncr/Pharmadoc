import { defineStore } from 'pinia'
import { passOrder } from '@/services/medecineService'

export const useOrderStore = defineStore('order', {
  state: () => ({
    loading: false,
    error: null
  }),

  actions: {
    async create_order(orderDetails) {
      this.loading = true
      this.error = null
      try {
        await passOrder(orderDetails)
        return true
      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur lors de la création de la commande.'
      } finally {
        this.loading = false
      }
    }
  }
})
