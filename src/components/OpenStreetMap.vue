<template>
  <div ref="mapElement" class="map-container"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const props = defineProps({
  selectedPharmacy: Object // Recevez la pharmacie sélectionnée en tant que prop
})

// Référence à l'élément de la carte
const mapElement = ref(null)
let map

const initMap = (userLocation) => {
  if (mapElement.value) {
    // Coordonnées par défaut (Abidjan)
    const defaultCenter = { lat: 5.347, lng: -4.007 }
    const center = userLocation || defaultCenter // Utilise la localisation de l'utilisateur si disponible

    // Initialiser la carte
    map = L.map(mapElement.value).setView(center, 12) // Niveau de zoom

    // Ajouter une couche de tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // Marqueur par défaut (pour Abidjan ou la position de l'utilisateur)
    L.marker(center).addTo(map).bindPopup('Vous êtes ici').openPopup()
  } else {
    console.error("L'élément de la carte n'est pas disponible")
  }
}

// Méthode pour afficher la pharmacie sélectionnée sur la carte
const showPharmacyOnMap = (pharmacy) => {
  if (pharmacy) {
    map.setView(pharmacy.coordinates, 14) // Centrer sur la pharmacie
    L.marker(pharmacy.coordinates).addTo(map).bindPopup(pharmacy.nom).openPopup() // Ajouter le marqueur
  } else {
    // Si aucune pharmacie n'est sélectionnée, revenir à la position de l'utilisateur ou à Abidjan
    const defaultCenter = { lat: 5.347, lng: -4.007 }
    map.setView(defaultCenter, 12) // Recentrer sur Abidjan
  }
}

// Fonction pour obtenir la position de l'utilisateur
const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log(userLocation)
        initMap(userLocation) // Initialiser la carte avec la position de l'utilisateur
      },
      () => {
        // Si l'utilisateur refuse la localisation, on initialise la carte avec la position par défaut
        console.warn(
          "La localisation de l'utilisateur a été refusée. Utilisation de la position par défaut."
        )
        initMap()
      }
    )
  } else {
    // Si le navigateur ne supporte pas la géolocalisation, on initialise avec la position par défaut
    console.warn("La géolocalisation n'est pas supportée par ce navigateur.")
    initMap()
  }
}

// Initialiser la carte quand le composant est monté
onMounted(() => {
  getUserLocation() // Demander la localisation de l'utilisateur lors du montage
})

// Observer la prop selectedPharmacy et afficher la pharmacie sur la carte lorsqu'elle change
watch(
  () => props.selectedPharmacy,
  (newVal) => {
    showPharmacyOnMap(newVal)
  }
)
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh; /* Prend toute la hauteur de la fenêtre */
}
</style>
