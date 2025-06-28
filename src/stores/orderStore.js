import { defineStore } from 'pinia'
import { passOrder, getOrders, getOrderById } from '@/services/medecineService'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
    loading: false,
    error: null
  }),

  actions: {
    async user_orders() {
      this.loading = true
      this.error = null
      try {
        const { data } = await getOrders(authStore.token, authStore.user.id)
        this.orders = data || []
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur lors de la récupération des categories.'
      } finally {
        this.loading = false
      }
    },
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
    },

    async one_order(id) {
      this.loading = true
      this.error = null
      try {
        const { data } = await getOrderById(authStore.token, id)
        return data
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur lors de la récupération du médicament.'
      } finally {
        this.loading = false
      }
    }
  }
})
