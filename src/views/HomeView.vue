<template>
  <main>
    <div class="container">
      <h1>Trouvez vos médicaments en un clic</h1>
      <p>Recherchez un médicament et trouvez les pharmacies les plus proches rapidement</p>

      <form @submit.prevent="handleSearch">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Entrez le nom d’un médicament..."
          v-model="search"
        />
        <button type="submit" for="search">
          <SearchIcon></SearchIcon>
          Rechercher
        </button>
      </form>
    </div>
  </main>
</template>

<script setup>
import SearchIcon from '@/components/icons/searchIcon.vue'
import router from '@/router'
import { ref } from 'vue'

const search = ref(null)

const handleSearch = () => {
  if (search.value) router.push(`/medicaments?search=${search.value}`)
  search.value = null
}
</script>

<style lang="scss" scoped>
main {
  background-color: #000;
  background-image: url('../assets/images/Carousel.webp');
  height: calc(100vh - 80px);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  color: $blue;
  font-size: 38px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  @media (max-width: $tablette) {
    font-size: 32px;
  }
}
p {
  font-size: 18px;
  text-align: center;
}

form {
  margin-top: 7.5rem;
  display: flex;
  justify-content: center;

  @media (max-width: $phone) {
    display: block;
    margin-top: 4.5rem;
  }
  input {
    width: 100%;
    max-width: 624px;
    height: 56px;
    border-radius: 5px 0 0 5px;
    outline: none;
    border: 1px solid #fff;
    padding: 0 24px;
    box-shadow: 0 21px 36px rgba($color: #000, $alpha: 0.1);

    &:active,
    &:focus {
      border-color: $blue;
    }

    &::placeholder {
      color: #707070;
    }
  }

  button {
    cursor: pointer;
    background-color: $blue;
    color: #fff;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0px 24px;
    height: 56px;
    border-radius: 0 5px 5px 0;
    border: 1px solid $blue;

    &:hover {
      background-color: $blue-hover;
    }
  }
}
</style>
