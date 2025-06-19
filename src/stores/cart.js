import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
  }),
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.newPrice * item.quantity, 0)
  },
  actions: {
    addItem(product) {
      const existingItem = this.items.find((item) => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...product, quantity: product.quantity || 1 })
      }
      localStorage.setItem('items', JSON.stringify(this.items))
    },
    increment(itemId) {
      const item = this.items.find((item) => item.id === itemId)
      if (item) item.quantity++
      localStorage.setItem('items', JSON.stringify(this.items))
    },
    decrement(itemId) {
      const item = this.items.find((item) => item.id === itemId)
      if (item && item.quantity > 1) item.quantity--
      localStorage.setItem('items', JSON.stringify(this.items))
    },
    removeItem(productId) {
      this.items = this.items.filter((item) => item.id !== productId)
      localStorage.setItem('items', JSON.stringify(this.items))
    },
    clearCart() {
      this.items = []
      localStorage.setItem('items', JSON.stringify(this.items))
    }
  }
})
