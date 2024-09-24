<template>
  <header>
    <router-link to="/" class="logo">
      <img src="/pharma.svg" />
      Pharmadoc
    </router-link>

    <div class="right">
      <router-link to="/help">Besoin d'aide ?</router-link>
      <router-link to="/pharmacie-garde" class="btn-link">Pharmacie de garde</router-link>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  @media (max-width: $tablette) {
    padding: 0 2rem;
  }
  @media (max-width: $phone) {
    padding: 0 15px;
  }
  position: sticky;
  z-index: 1;
  top: 0;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6rem;
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;

  .logo {
    @media (max-width: $phone) {
      font-size: 18px;
      img {
        width: 36px;
      }
    }
    display: flex;
    align-items: center;
    gap: 4px;
    color: $blue;
    font-weight: 300;
    text-transform: uppercase;
    font-size: 24px;
  }

  .right {
    a {
      @media (max-width: $phone) {
        display: none;
      }
      color: #000;
      font-size: 16px;
      font-weight: 500;

      &:hover {
        color: $blue-hover;
      }
    }

    .btn-link {
      @media (max-width: $phone) {
        display: block;
      }
      margin-left: 24px;
      background-color: $blue;
      color: #fff !important;
      font-weight: 600;
      transition: all 0.3s ease-in-out;
      padding: 8px 12px;
      border-radius: 5px;

      &:hover {
        background-color: $blue-hover;
      }
    }
  }
}
</style>
