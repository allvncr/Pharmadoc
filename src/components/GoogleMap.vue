<template>
  <div ref="mapElement" class="map-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

// Référence à l'élément de la carte
const mapElement = ref(null)

const initMap = () => {
  if (mapElement.value) {
    // Coordonnées par défaut (Abidjan)
    const center = { lat: 5.347, lng: -4.007 }

    // Initialiser la carte
    new google.maps.Map(mapElement.value, {
      center,
      zoom: 12 // Niveau de zoom
    })
  } else {
    console.error("L'élément de la carte n'est pas disponible")
  }
}

// Initialiser la carte quand le composant est monté
onMounted(() => {
  // Attendre que l'API Google Maps soit chargée
  const interval = setInterval(() => {
    if (window.google && window.google.maps) {
      clearInterval(interval)
      initMap()
    }
  }, 100) // Vérifier toutes les 100ms
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh; /* Prend toute la hauteur de la fenêtre */
}
</style>
