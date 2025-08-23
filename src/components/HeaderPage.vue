<template>
  <header>
    <router-link to="/" class="logo">
      <img src="/pharma.svg" />
      Pharmadoc
    </router-link>

    <div class="right">
      <div class="panier" @click="toggleCart">
        <svg width="14" height="16" class="shrink-0" viewBox="0 0 12.686 16">
          <g transform="translate(-27.023 -2)">
            <g transform="translate(27.023 5.156)">
              <g>
                <path
                  d="M65.7,111.043l-.714-9A1.125,1.125,0,0,0,63.871,101H62.459V103.1a.469.469,0,1,1-.937,0V101H57.211V103.1a.469.469,0,1,1-.937,0V101H54.862a1.125,1.125,0,0,0-1.117,1.033l-.715,9.006a2.605,2.605,0,0,0,2.6,2.8H63.1a2.605,2.605,0,0,0,2.6-2.806Zm-4.224-4.585-2.424,2.424a.468.468,0,0,1-.663,0l-1.136-1.136a.469.469,0,0,1,.663-.663l.8.8,2.092-2.092a.469.469,0,1,1,.663.663Z"
                  transform="translate(-53.023 -101.005)"
                  fill="#216cc8"
                ></path>
              </g>
            </g>
            <g transform="translate(30.274 2)">
              <g>
                <path
                  d="M160.132,0a3.1,3.1,0,0,0-3.093,3.093v.063h.937V3.093a2.155,2.155,0,1,1,4.311,0v.063h.937V3.093A3.1,3.1,0,0,0,160.132,0Z"
                  transform="translate(-157.039)"
                  fill="#216cc8"
                ></path>
              </g>
            </g>
          </g>
        </svg>
        ({{ cartStore.items.length }})
      </div>
      <router-link to="/help">Besoin d'aide ?</router-link>

      <div class="btn-link" @click="authStore.showLoginPopup = true" v-if="!authStore.token">
        Se connecter
      </div>

      <div class="user-menu" v-else @click="showDropdown = !showDropdown">
        <svg
          width="18"
          height="18"
          style="margin-right: 4px"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40 42V38C40 35.8783 39.1571 33.8434 37.6569 32.3431C36.1566 30.8429 34.1217 30 32 30H16C13.8783 30 11.8434 30.8429 10.3431 32.3431C8.84285 33.8434 8 35.8783 8 38V42M32 14C32 18.4183 28.4183 22 24 22C19.5817 22 16 18.4183 16 14C16 9.58172 19.5817 6 24 6C28.4183 6 32 9.58172 32 14Z"
            stroke="#fff"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        {{ authStore.user.firstName }}
        <svg width="12" height="12" style="margin-left: 6px" viewBox="0 0 20 20">
          <path d="M5 7l5 5 5-5H5z" fill="currentColor" />
        </svg>

        <ul v-if="showDropdown" class="dropdown">
          <li><router-link to="/profil">Profil</router-link></li>
          <li @click="authStore.logout">Déconnexion</li>
        </ul>
      </div>
    </div>

    <!-- Popup -->
    <div
      v-if="authStore.showLoginPopup"
      class="popup-overlay"
      @click.self="authStore.showLoginPopup = false"
    >
      <div class="popup">
        <div class="login-container">
          <div class="logo">Pharmadoc</div>
          <p class="subtitle">Connectez-vous avec votre email & mot de passe</p>

          <form class="login-form" @submit.prevent="handleLogin">
            <label>Email</label>
            <input type="email" v-model="email" required />

            <div class="password-label">
              <label>Mot de passe</label>
              <a href="#"> Mot de passe oublié ?</a>
            </div>
            <input :type="showPassword ? 'text' : 'password'" v-model="password" required />

            <button type="submit" class="login-button">Se connecter</button>
          </form>

          <!-- <div class="divider"><span>Ou</span></div>

          <button class="social-button google">Connexion avec Google</button> -->

          <p
            class="register-text"
            @click="(authStore.showLoginPopup = false), (showRegisterPopup = true)"
          >
            Vous n'avez pas de compte ? <a href="#">S'inscrire</a>
          </p>
        </div>
      </div>
    </div>

    <div v-if="showRegisterPopup" class="popup-overlay" @click.self="showRegisterPopup = false">
      <div class="popup">
        <div class="login-container">
          <div class="logo">Pharmadoc</div>
          <p class="subtitle">
            En vous inscrivant, vous acceptez nos conditions générales et notre politique.
          </p>

          <form class="login-form" @submit.prevent="handleRegister">
            <!-- <label>Nom</label>
            <input v-model="lastName" required />

            <label>Prénom</label>
            <input v-model="firstName" required /> -->

            <label>Email</label>
            <input type="email" v-model="email" required />

            <label>Mot de passe</label>
            <input :type="showPassword ? 'text' : 'password'" v-model="password" required />

            <button type="submit" class="login-button">S'inscrire</button>
          </form>

          <!-- <div class="divider"><span>Ou</span></div>

          <button class="social-button google">S'inscrire avec Google</button> -->

          <p
            class="register-text"
            @click="(showRegisterPopup = false), (authStore.showLoginPopup = true)"
          >
            Vous avez déjà un compte ? <a href="#">Se connecter</a>
          </p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '../stores/cart'

const authStore = useAuthStore()
const cartStore = useCartStore()

const showRegisterPopup = ref(false)
// const firstName = ref('')
// const lastName = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const showDropdown = ref(false)

const toggleCart = () => {
  cartStore.isCartVisible = !cartStore.isCartVisible
}

window.addEventListener('click', (e) => {
  if (!e.target.closest('.user-menu')) showDropdown.value = false
})

// Gérer la connexion
const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value)
    authStore.showLoginPopup = false
    if (!authStore.user.valid) window.location.href = '/profil'
  } catch (error) {
    alert(error)
  }
}

// Gérer l'inscription
const handleRegister = async () => {
  try {
    await authStore.register({
      // firstName: firstName.value,
      // lastName: lastName.value,
      email: email.value,
      password: password.value
    })
    showRegisterPopup.value = false
    authStore.showLoginPopup = true
  } catch (error) {
    alert(error)
  }
}
</script>

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
      font-size: 14px;
      flex-direction: column;
      img {
        width: 32px !important;
      }
    }
    display: flex;
    align-items: center;
    gap: 4px;
    color: $blue;
    font-weight: 300;
    text-transform: uppercase;
    font-size: 18px;
    img {
      width: 48px;
    }
  }

  .right {
    display: flex;
    gap: 8px;
    align-items: center;

    .panier {
      display: none;

      @media (max-width: $phone) {
        display: flex;
        align-items: center;
        svg {
          width: 24px;
          height: 24px;
        }
      }
    }

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
        margin-left: 8px;
        padding: 4px 8px;
        font-size: 12px;
      }
      cursor: pointer;
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

      &.logout {
        background-color: #f44336;
        color: #fff;

        &:hover {
          background-color: #d32f2f;
        }
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .popup {
    @media (max-width: $phone) {
      max-width: none;
    }
    width: 100%;
    max-width: 420px;
    background: #fff;
    padding: 32px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;

    .logo {
      justify-content: center;
      font-size: 18px;
    }

    & button {
      margin-top: 10px;
      padding: 8px 12px;
      background-color: $blue;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: $blue-hover;
      }
    }
  }
}

.login-container {
  margin: auto;
  background: #fff;
  border-radius: 8px;
  text-align: center;

  .logo {
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  .subtitle {
    color: #666;
    font-size: 14px;
    margin: 0.5rem 0 1.5rem;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
      text-align: left;
      font-size: 0.9rem;
      font-weight: 600;
    }

    input {
      padding: 0.6rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;

      &:active,
      &:focus {
        outline: 1px solid $blue;
      }
    }

    .password-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;

      a {
        font-size: 0.85rem;
        color: $blue;
        text-decoration: none;
      }
    }

    .login-button {
      background-color: $blue;
      color: white;
      border: none;
      padding: 0.7rem;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;

      &:hover {
        background-color: $blue-hover;
      }
    }
  }

  .divider {
    display: flex;
    align-items: center;
    margin: 1rem 0;

    span {
      background: #fff;
      padding: 0 1rem;
      color: #999;
      font-size: 0.9rem;
    }

    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #ddd;
    }
  }

  .social-button {
    width: 100%;
    padding: 0.7rem;
    border-radius: 5px;
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
    border: none;
    cursor: pointer;

    &.google {
      background-color: #db4437 !important;
      color: white;
    }
  }

  .register-text {
    font-size: 0.9rem;
    color: #444;
    margin-top: 1rem;

    a {
      color: $blue;
      font-weight: 600;
      text-decoration: underline;
    }
  }
}

.user-menu {
  @media (max-width: $phone) {
    margin-left: 0;
  }
  position: relative;
  cursor: pointer;
  background: $blue;
  color: #fff;
  padding: 8px 12px;
  border-radius: 5px;
  font-weight: 600;
  margin-left: 24px;
  display: flex;
  align-items: center;

  &:hover {
    background: $blue-hover;
  }

  .dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    color: #333;
    list-style: none;
    padding: 0.5rem 0;
    border: 1px solid #eee;
    border-radius: 6px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    width: 160px;
    z-index: 100;

    li {
      padding: 10px 16px;
      cursor: pointer;

      &:hover {
        background-color: #f5f5f5;
      }

      a {
        display: block;
        color: #333;
        text-decoration: none;
      }
    }
  }
}
</style>
