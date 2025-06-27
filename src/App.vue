<template>
  <div id="app">
    <HeaderPage />
    <RouterView />
    <CartComponent />
  </div>
</template>

<script setup>
import HeaderPage from './components/HeaderPage.vue'
import CartComponent from '@/components/CartComponent.vue'
</script>

<style lang="scss" scoped></style>
