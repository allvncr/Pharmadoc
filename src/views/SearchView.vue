<template>
  <main>
    <div class="container">
      <h1>Médicament/Pharmacies</h1>
      <p>
        Résultats pour la liste des pharmacies triés de la plus proche à la plus eloignés de vous
      </p>
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

      <div class="no-result" v-if="!pharmas.length">
        <NoResultIcon></NoResultIcon>
        <h4>Désolé, Aucune pharmacie ne possède des stocks de ce medicament.</h4>
      </div>
      <div class="results" v-else>
        <div class="left">
          <div
            class="pharma"
            v-for="(pharma, i) in pharmas"
            :key="i"
            @click.prevent="selectPharmacy(pharma)"
          >
            <div class="icon"></div>
            <div class="infos">
              <h2>{{ pharma.nom }}</h2>
              <p>{{ pharma.localisation }}</p>
            </div>
          </div>
        </div>
        <div class="right">
          <OpenStreetMap :selectedPharmacy="selectedPharmacy" />
        </div>
      </div>
    </div>

    <FooterPage></FooterPage>
  </main>
</template>

<script setup>
import SearchIcon from '@/components/icons/searchIcon.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { ref } from 'vue'
import FooterPage from '@/components/FooterPage.vue'
import NoResultIcon from '@/components/icons/noResultIcon.vue'
import OpenStreetMap from '@/components/OpenStreetMap.vue'

const search = ref(null)

const pharmas = [
  {
    nom: 'Pharmacie Les Arums',
    localisation: '8e Tranche, Abidjan',
    coordinates: { lat: 5.3955834, lng: -3.9770936 }
  },
  {
    nom: 'Pharmacie du Plateau',
    localisation: 'Rue du Commerce, Plateau, Abidjan',
    coordinates: { lat: 5.316416263580322, lng: -4.015980243682861 }
  },
  {
    nom: 'Pharmacie des Lagunes',
    localisation: 'Boulevard Lagunaire, Cocody, Abidjan',
    coordinates: { lat: 5.3072654, lng: -3.994634 }
  },
  {
    nom: 'Pharmacie Laoulo',
    localisation: 'Rue des Jardins, Cocody, Abidjan',
    coordinates: { lat: 5.3332213, lng: -4.0625749 }
  },
  {
    nom: 'Pharmacie de la Riviera 2',
    localisation: 'Rue des Jardins, Riviera 2, Cocody, Abidjan',
    coordinates: { lat: 5.3531145, lng: -3.9767253 }
  },
  {
    nom: 'Pharmacie Sainte Rita',
    localisation: 'Rue du Lycée Technique, Adjamé, Abidjan',
    coordinates: { lat: 5.3558006, lng: -4.0661068 }
  },
  {
    nom: 'Pharmacie des Deux Plateaux',
    localisation: 'Rue des Jardins, 7ème Tranche, Abidjan',
    coordinates: { lat: 5.3705136, lng: -3.9979318 }
  },
  {
    nom: 'Pharmacie de Cocody Danga',
    localisation: 'Boulevard Latrille, Cocody, Abidjan',
    coordinates: { lat: 5.3369119, lng: -4.0000882 }
  }
]

const selectedPharmacy = ref(null)

// Méthode pour sélectionner une pharmacie
const selectPharmacy = (pharma) => {
  console.log(pharma)
  selectedPharmacy.value = pharma
}

onMounted(() => {
  if (route.query && route.query.search) {
    document.title = `Pharmadoc - ${route.query.search}`
    search.value = route.query.search
  }
})
</script>

<style lang="scss" scoped>
.container {
  padding-top: 40px;
  padding-bottom: 40px;
  min-height: calc(100vh - 80px);
}

h1 {
  color: $blue;
  font-size: 38px;
  font-weight: 700;
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
  margin-top: 3rem;
  display: flex;
  justify-content: center;

  @media (max-width: $phone) {
    display: block;
    margin-top: 4.5rem;
  }
  input {
    background-color: #f3f4f6;
    width: 100%;
    max-width: 624px;
    height: 48px;
    border-radius: 5px 0 0 5px;
    outline: none;
    border: 1px solid #f3f4f6;
    padding: 0 24px;

    &:active,
    &:focus {
      border-color: $blue;
      background-color: #fff;
    }

    &::placeholder {
      color: #707070;
    }
  }

  button {
    @media (max-width: $phone) {
      width: 100%;
    }
    cursor: pointer;
    background-color: $blue;
    color: #fff;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0px 24px;
    height: 48px;
    border-radius: 0 5px 5px 0;
    border: 1px solid $blue;

    &:hover {
      background-color: $blue-hover;
    }
  }
}

.no-result {
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h4 {
    margin-top: 2rem;
    font-weight: 400;
    font-size: 18px;
  }
}

.results {
  @media (max-width: $tablette) {
    flex-direction: column-reverse;
    gap: 32px;
  }
  position: relative;
  padding: 48px 0;
  display: flex;
  gap: 16px;

  .left {
    @media (max-width: $tablette) {
      width: 100%;
    }
    width: 30%;
    height: 500px;
    overflow-y: auto;

    .pharma {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 5px;
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -2px rgba(0, 0, 0, 0.1);
      margin-bottom: 12px;

      &:hover {
        border-color: #d1d5db;
      }

      .icon {
        height: 56px;
        width: 56px;
        min-width: 56px;
        background-image: url('../assets/images/Medicine.png');
        background-size: cover;
        background-position: center;
      }

      .infos {
        h2 {
          color: #1f2937;
          font-size: 16px;
          text-transform: uppercase;
        }

        p {
          color: #707070;
          font-size: 14px;
          text-align: left;
        }
      }
    }
  }
  .right {
    @media (max-width: $tablette) {
      width: 100%;
    }
    width: 60%;
    z-index: 0;
  }
}
</style>
