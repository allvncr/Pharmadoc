<template>
  <main>
    <section class="hero">
      <div class="container">
        <h1>Trouvez vos médicaments en un clic</h1>
        <p>Recevez vos médicaments à domicile toute la journée, tous les jours</p>

        <form @submit.prevent="handleSearch">
          <div class="search-wrapper">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Entrez le nom d’un médicament..."
              v-model="search"
              @input="debouncedSearch"
            />
            <span v-if="medecineStore.loading" class="loader-spinner"></span>
            <ul
              v-if="search && medecineStore.medecines.length && !medecineStore.loading"
              class="search-dropdown"
            >
              <li v-for="med in medecineStore.medecines" :key="med.id" @click="openProduct(med.id)">
                <img :src="med.url" :alt="med.name" />
                {{ med.name }}
              </li>
            </ul>
          </div>
          <button type="submit" for="search">
            <SearchIcon></SearchIcon>
            Rechercher
          </button>
        </form>
      </div>
    </section>

    <div class="order-cards">
      <div class="card">
        <img
          src="https://lasante-images.s3.eu-west-1.amazonaws.com/temp/2025-06-Banniere-Homepage-Soldes.webp"
          alt=""
        />
      </div>
      <div class="card">
        <img
          src="https://lasante-images.s3.eu-west-1.amazonaws.com/Banniere+Homepage+Bausch+Lomb+S26+2025.webp"
          alt=""
        />
      </div>
    </div>

    <div class="shop-container">
      <aside class="sidebar">
        <ul>
          <li @click="handleCategory(null)" :class="{ active: !selectedCategoryId }">
            <span>Tous</span>
          </li>
          <li
            v-for="(category, i) in displayedCategories"
            :key="i"
            @click="handleCategory(category.id)"
            :class="{ active: selectedCategoryId === category.id }"
          >
            <span>{{ category.name }}</span>
          </li>
        </ul>

        <button class="toggle-btn" @click="showAllCategories = !showAllCategories">
          {{ showAllCategories ? 'Afficher moins' : 'Afficher plus' }}
        </button>
      </aside>

      <section class="product-grid">
        <template v-if="medecineStore.medecines.length">
          <div class="product-card" v-for="product in medecineStore.medecines" :key="product.id">
            <div class="image-container" @click="openProduct(product.id)">
              <img :src="product.url" :alt="product.name" />
              <span v-if="product.oldPrice && product.newPrice" class="badge">
                {{ Math.round(100 - (product.newPrice / product.oldPrice) * 100) }}%
              </span>
            </div>
            <div class="info">
              <p class="name" @click="openProduct(product.id)">{{ product.name }}</p>
              <div class="bottom">
                <div class="price">
                  <strong>{{ product.newPrice.toLocaleString('fr-CI') }} FCFA</strong>
                  <del v-if="product.oldPrice"
                    >{{ product.oldPrice.toLocaleString('fr-CI') }} FCFA</del
                  >
                </div>
                <button class="add-btn" @click="useCart.addItem(product)">+</button>
              </div>
            </div>
          </div>
          <div class="pagination" v-if="medecineStore.totalPages > 1">
            <button :disabled="page === 0" @click="() => changePage(page - 1)">Précédent</button>
            <button
              v-for="p in medecineStore.totalPages"
              :key="p"
              :class="{ active: page === p - 1 }"
              @click="() => changePage(p - 1)"
            >
              {{ p }}
            </button>
            <button
              :disabled="page === medecineStore.totalPages - 1"
              @click="() => changePage(page + 1)"
            >
              Suivant
            </button>
          </div>
        </template>
        <template v-else>
          <div class="no-product">
            <svg width="140" height="176" viewBox="0 0 231.91 292">
              <defs>
                <linearGradient
                  id="linear-gradient"
                  x1="1"
                  y1="0.439"
                  x2="0.369"
                  y2="1"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0" stop-color="#029477"></stop>
                  <stop offset="1" stop-color="#009e7f"></stop>
                </linearGradient>
              </defs>
              <g
                id="no_cart_in_bag_2"
                data-name="no cart in bag 2"
                transform="translate(-1388 -351)"
              >
                <ellipse
                  id="Ellipse_2873"
                  data-name="Ellipse 2873"
                  cx="115.955"
                  cy="27.366"
                  rx="115.955"
                  ry="27.366"
                  transform="translate(1388 588.268)"
                  fill="#ddd"
                  opacity="0.25"
                ></ellipse>
                <path
                  id="Path_18691"
                  data-name="Path 18691"
                  d="M29.632,0H170.368A29.828,29.828,0,0,1,200,30.021V209.979A29.828,29.828,0,0,1,170.368,240H29.632A29.828,29.828,0,0,1,0,209.979V30.021A29.828,29.828,0,0,1,29.632,0Z"
                  transform="translate(1403 381)"
                  fill="#009e7f"
                ></path>
                <path
                  id="Rectangle_1852"
                  data-name="Rectangle 1852"
                  d="M30,0H170a30,30,0,0,1,30,30v0a30,30,0,0,1-30,30H12.857A12.857,12.857,0,0,1,0,47.143V30A30,30,0,0,1,30,0Z"
                  transform="translate(1403 381)"
                  fill="#006854"
                ></path>
                <path
                  id="Rectangle_1853"
                  data-name="Rectangle 1853"
                  d="M42,0H158a42,42,0,0,1,42,42v0a18,18,0,0,1-18,18H18A18,18,0,0,1,0,42v0A42,42,0,0,1,42,0Z"
                  transform="translate(1403 381)"
                  fill="#006854"
                ></path>
                <path
                  id="Path_18685"
                  data-name="Path 18685"
                  d="M446.31,246.056a30,30,0,1,1,30-30A30.034,30.034,0,0,1,446.31,246.056Zm0-53.294A23.3,23.3,0,1,0,469.9,216.056,23.471,23.471,0,0,0,446.31,192.762Z"
                  transform="translate(1056.69 164.944)"
                  fill="#006854"
                ></path>
                <path
                  id="Path_18686"
                  data-name="Path 18686"
                  d="M446.31,375.181a30,30,0,1,1,30-30A30.034,30.034,0,0,1,446.31,375.181Zm0-53.294A23.3,23.3,0,1,0,469.9,345.181,23.471,23.471,0,0,0,446.31,321.887Z"
                  transform="translate(1057.793 95.684)"
                  fill="#009e7f"
                ></path>
                <circle
                  id="Ellipse_2874"
                  data-name="Ellipse 2874"
                  cx="28.689"
                  cy="28.689"
                  r="28.689"
                  transform="translate(1473.823 511.046)"
                  fill="#006854"
                ></circle>
                <circle
                  id="Ellipse_2875"
                  data-name="Ellipse 2875"
                  cx="15.046"
                  cy="15.046"
                  r="15.046"
                  transform="translate(1481.401 547.854) rotate(-45)"
                  fill="#009e7f"
                ></circle>
                <path
                  id="Path_18687"
                  data-name="Path 18687"
                  d="M399.71,531.27a71.755,71.755,0,0,1,12.65-13.6c3.4-2.863-1.5-7.726-4.882-4.882a78.392,78.392,0,0,0-13.73,15c-2.56,3.644,3.424,7.1,5.962,3.485Z"
                  transform="translate(1060.579 -35.703)"
                  fill="#006854"
                ></path>
                <path
                  id="Path_18688"
                  data-name="Path 18688"
                  d="M412.913,527.786a78.419,78.419,0,0,0-13.73-15c-3.38-2.843-8.289,2.017-4.882,4.882a71.785,71.785,0,0,1,12.65,13.6c2.535,3.609,8.525.162,5.962-3.485Z"
                  transform="translate(1060.566 -35.704)"
                  fill="#006854"
                ></path>
                <path
                  id="Path_18689"
                  data-name="Path 18689"
                  d="M583.278,527.786a78.417,78.417,0,0,0-13.73-15c-3.38-2.843-8.289,2.017-4.882,4.882a71.768,71.768,0,0,1,12.65,13.6c2.535,3.609,8.525.162,5.962-3.485Z"
                  transform="translate(970.304 -35.704)"
                  fill="#006854"
                ></path>
                <path
                  id="Path_18690"
                  data-name="Path 18690"
                  d="M570.075,531.27a71.77,71.77,0,0,1,12.65-13.6c3.4-2.863-1.5-7.726-4.882-4.882a78.407,78.407,0,0,0-13.73,15c-2.56,3.644,3.424,7.1,5.962,3.485Z"
                  transform="translate(970.318 -35.703)"
                  fill="#006854"
                ></path>
                <path
                  id="Path_18692"
                  data-name="Path 18692"
                  d="M301.243,287.464a19.115,19.115,0,0,1,8.071,9.077,19.637,19.637,0,0,1,1.6,7.88v26.085a19.349,19.349,0,0,1-9.672,16.957c-10.048-6.858-16.544-17.742-16.544-30S291.2,294.322,301.243,287.464Z"
                  transform="translate(1292.301 101.536)"
                  fill="url(#linear-gradient)"
                ></path>
                <path
                  id="Path_18693"
                  data-name="Path 18693"
                  d="M294.371,287.464a19.115,19.115,0,0,0-8.071,9.077,19.637,19.637,0,0,0-1.6,7.88v26.085a19.349,19.349,0,0,0,9.672,16.957c10.048-6.858,16.544-17.742,16.544-30S304.419,294.322,294.371,287.464Z"
                  transform="translate(1118.301 101.536)"
                  fill="url(#linear-gradient)"
                ></path>
              </g>
            </svg>
            <p>Désolé, aucun produit trouvé :(</p>
          </div>
        </template>
      </section>
    </div>

    <div v-if="isPopupOpen" class="popup-overlay" @click.self="closePopup">
      <div class="popup-content">
        <button class="close-btn" @click="closePopup" aria-label="Fermer le popup">&times;</button>
        <!-- Affichage du loader -->
        <div v-if="medecineStore.loading || !medecineStore.medecine" class="loader-wrapper">
          <span class="popup-loader"></span>
        </div>

        <!-- Affichage du produit -->
        <div v-else class="product-detail">
          <div class="product-image">
            <div class="discount" v-if="selectedProduct.oldPrice && selectedProduct.newPrice">
              {{ Math.round(100 - (selectedProduct.newPrice / selectedProduct.oldPrice) * 100) }}%
            </div>
            <img :src="selectedProduct.url" :alt="selectedProduct.id" />
          </div>

          <div class="product-info">
            <h2>{{ selectedProduct.name }}</h2>

            <div class="meta">
              <div>
                <strong>Categories</strong>
                <span class="tag">{{ selectedProduct.categoryDTO.name }}</span>
              </div>
            </div>

            <div class="price">
              <strong>{{ selectedProduct.newPrice.toLocaleString('fr-CI') }} FCFA</strong>
              <del v-if="selectedProduct.oldPrice">
                {{ selectedProduct.oldPrice.toLocaleString('fr-CI') }} FCFA
              </del>
            </div>

            <p>{{ selectedProduct.smallDescription }}</p>

            <!-- 👇 Sélecteur de quantité -->
            <div class="quantity-selector">
              <label for="qty">Quantité :</label>
              <input type="number" id="qty" min="1" v-model.number="selectedQuantity" />
            </div>

            <!-- 👇 Ajout avec quantité -->
            <button class="add-cart-btn" @click="addToCart">Ajouter au panier</button>
          </div>
          <div class="product-description">
            <h2>Description</h2>
            <p v-if="selectedProduct.completeDescription">
              {{ selectedProduct.completeDescription }}
            </p>
            <p v-else>Aucune description disponible pour ce produit.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import debounce from 'lodash/debounce'
import { useCartStore } from '../stores/cart'
import { useMedecineStore } from '@/stores/medecineStore'
import SearchIcon from '@/components/icons/searchIcon.vue'

const isPopupOpen = ref(false)
const selectedProduct = ref({})
const search = ref('')
const useCart = useCartStore()
const medecineStore = useMedecineStore()
const page = ref(0)
const size = ref(8)
const selectedCategoryId = ref(null)
const showAllCategories = ref(false)
const selectedQuantity = ref(1)

const addToCart = () => {
  useCart.addItem({ ...selectedProduct.value, quantity: selectedQuantity.value })
  closePopup()
}

const displayedCategories = computed(() => {
  return showAllCategories.value ? medecineStore.categories : medecineStore.categories.slice(0, 6)
})

const debouncedSearch = debounce(() => {
  medecineStore.all_medecines({ page: 0, size: size.value, name: search.value })
}, 300)

// Charge les médicaments au montage
onMounted(() => {
  medecineStore.all_medecines({ page: page.value, size: size.value })
  medecineStore.all_categories()
})

const openProduct = (productId) => {
  medecineStore
    .one_medecine(productId)
    .then(() => {
      selectedProduct.value = medecineStore.medecine
      isPopupOpen.value = true
    })
    .catch(() => {
      selectedProduct.value = {}
    })
}

const closePopup = () => {
  isPopupOpen.value = false
  selectedProduct.value = {}
}

const handleCategory = (ID) => {
  search.value = ''
  selectedCategoryId.value = ID
  medecineStore.all_medecines({ page: 0, size: size.value, name: search.value, categoryId: ID })
}

const handleSearch = () => {
  medecineStore.all_medecines({ page: 0, size: size.value, name: search.value })

  const shopContainer = document.querySelector('.shop-container')
  if (shopContainer) {
    shopContainer.scrollIntoView({ behavior: 'smooth' })
  }
}

const changePage = (newPage) => {
  if (newPage < 0 || newPage >= medecineStore.totalPages) return
  page.value = newPage
  medecineStore.all_medecines({
    page: page.value,
    size: size.value,
    name: search.value,
    categoryId: selectedCategoryId.value
  })
}
</script>

<style lang="scss" scoped>
.hero {
  @media (max-width: $phone) {
    align-items: flex-start;
    padding-top: 32px;
    height: calc(80vh - 80px);
  }
  background-color: #f3f4f6;
  background-image: url('../assets/images/Carousel.webp');
  height: calc(100vh - 80px);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    @media (max-width: $tablette) {
      font-size: 28px;
    }
    @media (max-width: $phone) {
      font-size: 20px;
    }
    color: $blue;
    font-size: 38px;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
  }
  p {
    @media (max-width: $phone) {
      font-size: 16px;
    }
    font-size: 18px;
    text-align: center;
  }

  form {
    @media (max-width: $phone) {
      display: block;
      margin-top: 4.5rem;
    }
    position: relative;
    margin-top: 7.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .search-wrapper {
      position: relative;
      display: flex;
      align-items: center;

      input {
        width: 100%;
        min-width: 624px;
        height: 56px;
        border-radius: 5px 0 0 5px;
        outline: none;
        border: 1px solid #fff;
        padding: 0 2rem 0 24px;
        box-shadow: 0 21px 36px rgba($color: #000, $alpha: 0.1);

        &:active,
        &:focus {
          border-color: $blue;
        }

        &::placeholder {
          color: #707070;
        }
      }

      .loader-spinner {
        position: absolute;
        right: 12px;
        width: 16px;
        height: 16px;
        border: 2px solid #ccc;
        border-top: 2px solid $blue;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
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
      height: 56px;
      border-radius: 0 5px 5px 0;
      border: 1px solid $blue;

      &:hover {
        background-color: $blue-hover;
      }
    }

    .search-dropdown {
      position: absolute;
      left: 0;
      top: 100%;
      background: #fff;
      list-style: none;
      padding: 0;
      margin: 4px 0;
      width: 100%;
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid #ddd;
      border-radius: 4px;
      z-index: 10;

      li {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        cursor: pointer;
        gap: 8px;

        img {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }

        &:hover {
          background: #f5f5f5;
        }
      }
    }
  }
}

.order-cards {
  display: flex;
  gap: 20px;
  padding: 20px;
  position: relative;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;

  .card {
    flex: 1;
    background: #eaf4fc;
    border-radius: 10px;
    position: relative;

    img {
      width: 100%;
    }
  }
}

.shop-container {
  display: flex;

  .sidebar {
    width: 220px;
    background: #fff;
    padding: 32px 40px;
    border-right: 1px solid #eee;

    .toggle-btn {
      margin-top: 10px;
      background: transparent;
      color: $blue;
      border: none;
      cursor: pointer;
      font-size: 14px;
      padding: 4px 0;

      &:hover {
        text-decoration: underline;
      }
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin: 12px 0;
        cursor: pointer;

        img {
          width: 20px;
        }

        span {
          font-size: 14px;
        }

        &:hover,
        &.active {
          font-weight: 700;
          color: $blue-hover;
          text-decoration: underline;
        }
      }
    }
  }

  .product-grid {
    padding: 32px;
    background-color: #f3f4f6;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    flex: 1;

    .product-card {
      background: #fff;
      border: 1px solid #eee;
      border-radius: 10px;
      padding: 15px;
      position: relative;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;

      &:hover {
        box-shadow:
          0 1px 3px 0 rgba(0, 0, 0, 0.1),
          0 1px 2px -1px rgba(0, 0, 0, 0.1);
        transform: translateY(-0.125rem);
      }

      .image-container {
        position: relative;
        width: 100%;
        padding: 0 10px;
        cursor: pointer;

        img {
          width: 100%;
          object-fit: contain;
          aspect-ratio: 1 / 1;
        }

        .badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: $blue;
          color: #fff;
          font-size: 12px;
          padding: 3px 6px;
          border-radius: 4px;
        }
      }

      .info {
        .name {
          margin: 12px 0 8px;
          font-size: 12px;
          cursor: pointer;
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .price {
          font-size: 16px;

          strong {
            color: #333;
            margin-right: 5px;
          }

          del {
            color: #aaa;
            font-size: 13px;
          }
        }

        .add-btn {
          margin-top: auto;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 32px;
          height: 32px;
          font-size: 20px;
          cursor: pointer;
          transition: background 0.2s ease;

          &:hover {
            background: $blue;
            color: #fff;
          }
        }
      }
    }

    .no-product {
      grid-column: span 4;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      p {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
}

.popup-content {
  background: #fff;
  width: 1084px;
  max-height: 90vh;
  padding: 40px;
  border-radius: 10px;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }

  // Pour une meilleure apparence de scrollbar si tu veux :
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.product-detail {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  flex-wrap: wrap;

  .product-image {
    position: relative;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    width: 40%;

    img {
      width: 80%;
      object-fit: contain;
      aspect-ratio: 1 / 1;
    }

    .discount {
      position: absolute;
      top: 20px;
      left: 20px;
      background: $blue;
      color: #fff;
      font-weight: bold;
      font-size: 14px;
      padding: 4px 8px;
      border-radius: 8px;
    }
  }

  .product-info {
    flex: 1;
    h2 {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 5px;
    }

    p {
      margin: 5px 0;
      color: #555;
    }

    .price {
      margin: 15px 0;
      font-size: 20px;

      strong {
        color: $blue;
        margin-right: 10px;
      }

      del {
        color: #999;
      }
    }

    .add-cart-btn {
      background: $blue;
      color: #fff;
      padding: 12px 20px;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      margin-top: 10px;
      cursor: pointer;

      &:hover {
        background: $blue-hover;
      }
    }

    .stock {
      margin-top: 10px;
      color: #777;
    }

    .meta {
      margin-top: 20px;

      .tag {
        background: #f3f3f3;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 14px;
        margin-left: 5px;
      }
    }
  }

  .product-description {
    padding: 2rem 0;
    border-top: 1px solid #ccc;
    width: 100%;
    color: #555;

    h2 {
      color: #000;
      font-size: 20px;
      margin-bottom: 10px;
      font-weight: 500;
    }
  }

  .quantity-selector {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 1rem 0;

    input {
      width: 60px;
      padding: 6px 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }
}

.pagination {
  grid-column: span 4;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  button {
    background: #fff;
    border: 1px solid $blue;
    color: $blue;
    padding: 8px 16px;
    border-radius: 5px;
    font-size: 15px;
    cursor: pointer;
    transition:
      background 0.2s,
      color 0.2s;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: #f3f4f6;
      color: #aaa;
      border-color: #eee;
    }

    &.active {
      background: $blue;
      color: #fff;
      font-weight: bold;
      border-color: $blue;
    }

    &:hover:not(:disabled):not(.active) {
      background: $blue-hover;
      color: #fff;
    }
  }
}

.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.popup-loader {
  width: 32px;
  height: 32px;
  border: 3px solid #ccc;
  border-top: 3px solid $blue;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1024px) {
  .shop-container {
    flex-direction: column;

    .sidebar {
      width: 100%;
      padding: 20px;
      border-right: none;
      border-bottom: 1px solid #eee;
    }
  }

  .order-cards {
    flex-direction: column;
    .card {
      width: 100%;
    }
  }
}

@media (max-width: 1024px) {
  .shop-container .product-grid {
    display: flex !important;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;

    .product-card {
      flex: 0 0 calc(33% - 15px); // Deux cartes par ligne avec 20px de gap
    }
  }
}

@media (max-width: 640px) {
  .shop-container .product-grid .product-card {
    flex: 0 0 100%;
  }
}

@media (max-width: 768px) {
  .hero {
    background-position: center;
    form {
      flex-direction: column;

      .search-wrapper input,
      button {
        width: 100%;
        min-width: unset;
        border-radius: 5px;
      }

      button {
        margin-top: 10px;
        border-radius: 5px;
      }
    }
  }

  .product-grid {
    grid-template-columns: 1fr;
  }

  .popup-content .close-btn {
    display: block;
    position: relative;
    top: 0;
    right: 0;
    justify-self: flex-end;
  }
}

@media (max-width: 480px) {
  .popup-content {
    width: 90%;
    padding: 20px;
  }

  .product-detail {
    flex-direction: column;

    .product-image {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }

  .pagination {
    flex-wrap: wrap;
    gap: 4px;
    button {
      padding: 6px 10px;
      font-size: 14px;
    }
  }
}
</style>
