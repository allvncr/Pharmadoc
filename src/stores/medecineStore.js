import { defineStore } from 'pinia'
import { getMedecines, getMedecineById, getCategories } from '@/services/medecineService'

export const useMedecineStore = defineStore('medecine', {
  state: () => ({
    medecines: [],
    medecine: null,
    categories: [],
    loading: false,
    error: null
  }),

  actions: {
    async all_medecines(searchQuery = '') {
      this.loading = true
      this.error = null
      try {
        const { data } = await getMedecines(searchQuery)
        this.medecines = data.content || []
      } catch (err) {
        this.error =
          err.response?.data?.message || 'Erreur lors de la récupération des médicaments.'
      } finally {
        this.loading = false
      }
    },

    async all_categories() {
      this.loading = true
      this.error = null
      try {
        const { data } = await getCategories()
        this.categories = data || []
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur lors de la récupération des categories.'
      } finally {
        this.loading = false
      }
    },

    async one_medecine(id) {
      this.loading = true
      this.error = null
      try {
        const { data } = await getMedecineById(id)
        this.medecine = data || null
      } catch (err) {
        this.error = err.response?.data?.message || 'Erreur lors de la récupération du médicament.'
      } finally {
        this.loading = false
      }
    }
  }
})
