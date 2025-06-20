<template>
  <div class="panier">
    <!-- Cart Summary Button -->
    <div class="cart-summary" @click="toggleCart">
      <div class="item-count">
        <svg width="14" height="16" class="shrink-0" viewBox="0 0 12.686 16">
          <g transform="translate(-27.023 -2)">
            <g transform="translate(27.023 5.156)">
              <g>
                <path
                  d="M65.7,111.043l-.714-9A1.125,1.125,0,0,0,63.871,101H62.459V103.1a.469.469,0,1,1-.937,0V101H57.211V103.1a.469.469,0,1,1-.937,0V101H54.862a1.125,1.125,0,0,0-1.117,1.033l-.715,9.006a2.605,2.605,0,0,0,2.6,2.8H63.1a2.605,2.605,0,0,0,2.6-2.806Zm-4.224-4.585-2.424,2.424a.468.468,0,0,1-.663,0l-1.136-1.136a.469.469,0,0,1,.663-.663l.8.8,2.092-2.092a.469.469,0,1,1,.663.663Z"
                  transform="translate(-53.023 -101.005)"
                  fill="currentColor"
                ></path>
              </g>
            </g>
            <g transform="translate(30.274 2)">
              <g>
                <path
                  d="M160.132,0a3.1,3.1,0,0,0-3.093,3.093v.063h.937V3.093a2.155,2.155,0,1,1,4.311,0v.063h.937V3.093A3.1,3.1,0,0,0,160.132,0Z"
                  transform="translate(-157.039)"
                  fill="currentColor"
                ></path>
              </g>
            </g>
          </g>
        </svg>
        <span>{{ useCart.totalItems }} Items</span>
      </div>
      <div class="total-price">{{ useCart.totalPrice.toLocaleString('fr-CI') }} FCFA</div>
    </div>

    <!-- BACKDROP -->
    <transition name="fade">
      <div v-if="isCartVisible" class="cart-backdrop" @click="isCartVisible = false"></div>
    </transition>

    <!-- Cart Panel -->
    <transition name="slide">
      <div v-if="isCartVisible" class="cart-content">
        <!-- Contenu du panier -->
        <div class="cart-header">
          <div class="cart-icon">
            <svg width="24" height="22" class="shrink-0" viewBox="0 0 12.686 16">
              <g transform="translate(-27.023 -2)">
                <g transform="translate(27.023 5.156)">
                  <g>
                    <path
                      d="M65.7,111.043l-.714-9A1.125,1.125,0,0,0,63.871,101H62.459V103.1a.469.469,0,1,1-.937,0V101H57.211V103.1a.469.469,0,1,1-.937,0V101H54.862a1.125,1.125,0,0,0-1.117,1.033l-.715,9.006a2.605,2.605,0,0,0,2.6,2.8H63.1a2.605,2.605,0,0,0,2.6-2.806Zm-4.224-4.585-2.424,2.424a.468.468,0,0,1-.663,0l-1.136-1.136a.469.469,0,0,1,.663-.663l.8.8,2.092-2.092a.469.469,0,1,1,.663.663Z"
                      transform="translate(-53.023 -101.005)"
                      fill="currentColor"
                    ></path>
                  </g>
                </g>
                <g transform="translate(30.274 2)">
                  <g>
                    <path
                      d="M160.132,0a3.1,3.1,0,0,0-3.093,3.093v.063h.937V3.093a2.155,2.155,0,1,1,4.311,0v.063h.937V3.093A3.1,3.1,0,0,0,160.132,0Z"
                      transform="translate(-157.039)"
                      fill="currentColor"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            {{ useCart.totalItems }} Items
          </div>
          <button class="close-btn" @click="isCartVisible = false">✕</button>
        </div>

        <div class="cart-items" v-if="useCart.totalItems > 0">
          <div class="cart-item" v-for="item in useCart.items" :key="item.id">
            <div class="qty-control">
              <button @click="useCart.increment(item.id)">+</button>
              <span>{{ item.quantity }}</span>
              <button @click="useCart.decrement(item.id)">−</button>
            </div>

            <img :src="item.url" alt="item" class="item-image" />

            <div class="item-info">
              <div class="item-title">{{ item.name }}</div>
              <div class="item-price-single">
                {{ item.quantity }} x {{ item.newPrice.toLocaleString('fr-CI') }} FCFA
              </div>
              <!-- <div class="item-weight">
                {{ item.quantity }} x {{ item.newPrice.toLocaleString('fr-CI') }}
              </div> -->
            </div>

            <div class="item-price-total">
              {{ (item.newPrice * item.quantity).toLocaleString('fr-CI') }} FCFA
            </div>
            <button class="remove-btn" @click="useCart.removeItem(item.id)">×</button>
          </div>
        </div>
        <div class="cart-items" v-else>
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
        </div>

        <div class="cart-footer">
          <button class="checkout-btn" @click="checkoutPage">
            <p>Checkout</p>
            <span>{{ useCart.totalPrice.toLocaleString('fr-CI') }} FCFA</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const useCart = useCartStore()

const router = useRouter()

const isCartVisible = ref(false)

const toggleCart = () => {
  isCartVisible.value = !isCartVisible.value
}

const checkoutPage = () => {
  if (!authStore.token) {
    isCartVisible.value = false
    authStore.openLoginPopup()
    return
  }
  // Logic to navigate to the checkout page
  if (useCart.totalItems === 0) return

  isCartVisible.value = false
  router.push('/checkout')
}
</script>

<style lang="scss" scoped>
.cart-summary {
  cursor: pointer;
  position: fixed;
  top: 50%;
  right: 0;
  padding: 0.75rem;
  background-color: $blue;
  color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
  border-radius: 8px 0 0 8px;
  text-align: center;

  &:hover {
    background-color: $blue-hover;
  }
  .item-count {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-weight: 600;
    white-space: nowrap;

    span {
      font-size: 14px;
      line-height: 1.25rem;
    }
  }

  .total-price {
    background: #fff;
    color: $blue;
    border-radius: 6px;
    padding: 8px 6px;
    font-weight: 700;
    font-size: 14px;
    margin-top: 12px;
  }
}

.cart-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 998;
  backdrop-filter: blur(1px);
}

.cart-content {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  max-width: 26rem;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: flex;
  flex-direction: column;

  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    font-weight: bold;
    color: $blue;
    font-size: 14px;
    border-bottom: 1px solid #e5e7ebbf;

    .cart-icon {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
      font-weight: 500;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 8px;
      cursor: pointer;
      background-color: #f3f4f6;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-weight: 700;
      transition: all 0.2s ease;

      &:hover {
        background-color: $blue;
        color: #fff;
      }
    }
  }

  .cart-items {
    flex: 1;
    overflow-y: auto;
  }

  .cart-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding: 16px 24px;
    border-bottom: 1px solid #e5e7ebbf;
    gap: 0.5rem;

    .qty-control {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;

      button {
        background: #f3f4f6;
        border: none;
        width: 20px;
        height: 20px;
        font-size: 1rem;
        cursor: pointer;
      }

      span {
        font-size: 0.9rem;
      }
    }

    .item-image {
      width: 56px;
      height: 56px;
      border-radius: 5px;
      margin: 0 0.75rem;
    }

    .item-info {
      flex: 1;
      font-size: 0.85rem;
      text-align: left;

      .item-title {
        font-weight: bold;
      }

      .item-price-single {
        color: $blue;
        padding: 10px 0;
        font-weight: 700;
      }

      .item-weight {
        color: #666;
        font-size: 0.75rem;
      }
    }

    .item-price-total {
      font-weight: 700;
      font-size: 0.9rem;
    }

    .remove-btn {
      background: none;
      border: none;
      font-size: 1rem;
      color: #999;
      cursor: pointer;
      margin-left: 12px;
    }
  }

  .cart-footer {
    padding: 20px 24px;
    border-top: 1px solid #e5e7ebbf;

    .checkout-btn {
      cursor: pointer;
      background: $blue;
      color: white;
      border: none;
      width: 100%;
      padding: 4px;
      height: 3.5rem;
      border-radius: 9999px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover {
        background: $blue-hover;
      }

      p {
        font-size: 14px;
        padding: 0 20px;
      }

      span {
        background: white;
        color: $blue;
        padding: 0 1.25rem;
        height: 100%;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
}

.no-product {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    font-size: 16px;
    font-weight: 600;
  }
}

/* BACKDROP: fondu en opacité */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* CART: slide depuis la droite */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-leave-from {
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
