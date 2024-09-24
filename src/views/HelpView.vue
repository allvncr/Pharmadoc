<template>
  <main>
    <div class="carousel">
      <h1>FAQs</h1>
      <div class="breadcum">
        <router-link to="/">
          <HomeIcon></HomeIcon>
          Accueil
        </router-link>
        <span>FAQs</span>
      </div>
    </div>
    <section>
      <div class="container">
        <details v-for="(FAQ, i) in FAQs" :key="i">
          <summary>{{ FAQ.Q }}</summary>
          <p>
            {{ FAQ.A }}
          </p>
        </details>
      </div>
    </section>
    <FooterPage></FooterPage>
  </main>
</template>

<script setup>
import FooterPage from '@/components/FooterPage.vue'
import HomeIcon from '@/components/icons/homeIcon.vue'
import { ref } from 'vue'

const FAQs = ref([
  {
    Q: "Qu'est-ce que Pharmadoc ?",
    A: 'Pharmadoc est une application web qui permet de rechercher des médicaments disponibles dans les pharmacies les plus proches de chez vous.'
  },
  {
    Q: 'Comment puis-je rechercher un médicament ?',
    A: "Il vous suffit d'entrer le nom du médicament dans la barre de recherche, et l'application vous affichera les pharmacies où il est disponible."
  },
  {
    Q: "Est-ce que l'application est gratuite ?",
    A: 'Oui, Pharmadoc est entièrement gratuite à utiliser. Vous pouvez rechercher autant de médicaments que vous le souhaitez sans frais.'
  },
  {
    Q: "Comment l'application détermine-t-elle les pharmacies les plus proches ?",
    A: "L'application utilise votre position géographique pour identifier les pharmacies à proximité et vous indiquer celles qui ont le médicament recherché en stock."
  },
  {
    Q: 'Puis-je trouver des pharmacies de garde avec Pharmadoc ?',
    A: 'Oui, vous pouvez également rechercher des pharmacies de garde disponibles près de chez vous à tout moment.'
  },
  {
    Q: 'Les informations sur les stocks de médicaments sont-elles mises à jour en temps réel ?',
    A: 'Les informations sont mises à jour régulièrement, mais il est possible que certaines données ne soient pas en temps réel. Il est recommandé de contacter la pharmacie pour confirmer la disponibilité.'
  },
  {
    Q: "L'application est-elle disponible sur mobile ?",
    A: 'Actuellement, Pharmadoc est une application web, mais elle est entièrement responsive et peut être utilisée sur des appareils mobiles via votre navigateur.'
  },
  {
    Q: 'Que faire si je ne trouve pas le médicament que je cherche ?',
    A: "Si vous ne trouvez pas un médicament, vérifiez l'orthographe ou essayez d'utiliser un synonyme. Si le problème persiste, n'hésitez pas à contacter le support de Pharmadoc."
  }
])
</script>

<style lang="scss" scoped>
.carousel {
  padding: 80px 0;
  background-color: #e2e8f0;
  background-image: url('../assets/images/pills.jpg');
  background-size: cover;

  h1 {
    font-size: 32px;
    text-align: center;
    margin-bottom: 30px;
  }

  .breadcum {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-align: center;

    a {
      color: #1f2937;
      display: flex;
      align-items: center;
      gap: 4px;
      line-height: 1;

      &::after {
        content: '>';
        margin-left: 4px;
      }

      &:hover {
        color: $blue;

        svg {
          fill: $blue;
        }
      }
    }

    span {
      color: #707070;
    }
  }
}
section {
  padding: 40px 0;
}

details {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  border: 1px solid #e5e7eb;

  &:hover {
    border-color: #d1d5db;
  }
}

summary {
  cursor: pointer;
  padding: 16px 20px;
  color: #1f2937;
}

p {
  padding: 4px 20px 16px;
  line-height: 2;
  color: #333;
}
</style>
