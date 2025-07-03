<template>
  <main class="profile-page">
    <aside class="sidebar">
      <div class="user-card">
        <div class="avatar">{{ userInitials }}</div>
        <h2>{{ authStore.user.firstName }} {{ authStore.user.lastName }}</h2>
        <p>{{ authStore.user.email }}</p>
      </div>

      <nav class="nav-links">
        <button :class="{ active: activeTab === 'personal' }" @click="activeTab = 'personal'">
          Informations Personnelles
        </button>
        <button :class="{ active: activeTab === 'orders' }" @click="activeTab = 'orders'">
          Historique des Commandes
        </button>
        <button class="logout" @click="logout">Deconnexion</button>
      </nav>
    </aside>

    <section class="content">
      <div v-if="activeTab === 'orders'">
        <h3>Historique des commandes</h3>
        <table class="orders-table">
          <thead>
            <tr>
              <th>Numéro de commande</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orderStore.orders"
              :key="order.id"
              @click="openOrder(order.orderNumber)"
            >
              <td>
                <a href="#">{{ order.orderNumber }}</a>
              </td>
              <td>{{ formatDate(order.orderDate) }}</td>
              <td>
                <span :class="['status', order.status.toLowerCase()]">{{ order.status }}</span>
              </td>
              <td>{{ order.totalAmount.toFixed(2) }} Fcfa</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="activeTab === 'personal'">
        <h3>Informations Personnelles</h3>
        <form class="login-form" @submit.prevent="handleUpdate">
          <label>Nom</label>
          <input v-model="authStore.user.firstName" required />

          <label>Prénom</label>
          <input v-model="authStore.user.lastName" required />

          <label>Email</label>
          <input type="email" v-model="authStore.user.email" required />

          <button type="submit" class="login-button">Mettre à jour</button>
        </form>
      </div>
    </section>

    <div v-if="isOrderPopupOpen" class="popup-overlay" @click.self="closeOrderPopup">
      <div class="popup-content">
        <button class="close-btn" @click="closeOrderPopup">&times;</button>

        <div class="order-header">
          <p><strong>Numéro de commande :</strong> {{ selectedOrder.orderNumber }}</p>
          <p><strong>Date :</strong> {{ formatDate(selectedOrder.orderDate) }}</p>
          <p><strong>Commentaire :</strong> {{ selectedOrder.comment }}</p>
          <p>
            <strong>Statut :</strong>
            <span class="status-tag">{{ selectedOrder.status }}</span>
          </p>
        </div>

        <h4>Articles commandés</h4>

        <table class="order-detail-table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Image</th>
              <th>Quantité</th>
              <th>Prix unitaire</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="line in selectedOrder.orderLines" :key="line.id">
              <td>{{ line.medicine.name }}</td>
              <td>
                <img :src="line.medicine.url" :alt="line.medicine.name" />
              </td>
              <td>{{ line.quantity }}</td>
              <td>{{ line.medicine.newPrice.toLocaleString('fr-CI') }} Fcfa</td>
              <td>{{ (line.medicine.newPrice * line.quantity).toLocaleString('fr-CI') }} Fcfa</td>
            </tr>
          </tbody>
        </table>

        <div class="order-total">
          Total de la commande : {{ selectedOrder.totalAmount.toLocaleString('fr-CI') }} Fcfa
        </div>
      </div>
    </div>

    <div v-if="showToast" class="toast-message">Profile mis à jour avec succès ✔️</div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useOrderStore } from '@/stores/orderStore'
import { format } from 'date-fns'
import frLocale from 'date-fns/locale/fr'
const isOrderPopupOpen = ref(false)
const selectedOrder = ref({})

const authStore = useAuthStore()
const orderStore = useOrderStore()

const showToast = ref(false)
const activeTab = ref('personal')

const userInitials = (authStore.user.firstName[0] + authStore.user.lastName[0]).toUpperCase()

const formatDate = (dateStr) => {
  return format(new Date(dateStr), 'dd MMMM yyyy, H:m', { locale: frLocale })
}

const openOrder = async (orderNumber) => {
  try {
    const order = await orderStore.one_order(orderNumber)
    selectedOrder.value = order
    isOrderPopupOpen.value = true
  } catch (err) {
    console.error('Erreur lors du chargement de la commande', err)
  }
}

const closeOrderPopup = () => {
  isOrderPopupOpen.value = false
  selectedOrder.value = {}
}

const logout = () => {
  authStore.logout()
}

const handleUpdate = async () => {
  try {
    await authStore.updateUser({
      id: authStore.user.id,
      firstName: authStore.user.firstName,
      lastName: authStore.user.lastName,
      email: authStore.user.email
    })

    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 2500)
  } catch (error) {
    alert(error)
  }
}

// Charge les médicaments au montage
onMounted(() => {
  orderStore.user_orders()
})
</script>

<style lang="scss" scoped>
.profile-page {
  display: flex;
  min-height: calc(100vh - 80px);
  background: #f8fafc;
}

.sidebar {
  width: 280px;
  background: white;
  padding: 2rem 1rem;
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-card {
  text-align: center;
  margin-bottom: 2rem;
}

.avatar {
  width: 64px;
  height: 64px;
  background: #e0f2fe;
  color: #0284c7;
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 50%;
  line-height: 64px;
  margin: auto;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  button {
    text-align: left;
    background: none;
    border: none;
    padding: 10px 1rem;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    border-radius: 4px;

    &.active {
      background: #e0f2fe;
      color: #0284c7;
    }

    &.logout {
      margin-top: 2rem;
      color: #f44336;

      &:hover {
        background: #fee;
      }
    }

    &:hover:not(.active) {
      background: #f3f4f6;
    }
  }
}

.content {
  flex: 1;
  padding: 2rem;

  h3 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .orders-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;

    th,
    td {
      padding: 12px 16px;
      border-bottom: 1px solid #eee;
      text-align: left;
      font-size: 14px;
    }

    th {
      background: #f1f5f9;
      font-weight: 600;
    }

    .status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: capitalize;
    }

    .paid {
      background: #dcfce7;
      color: #16a34a;
    }

    .en_attente,
    .en_preparation,
    .confirmee {
      background: #fef3c7;
      color: #b45309;
    }

    .livree,
    .expediee {
      background: #d1fae5;
      color: #059669;
    }

    .annulee,
    .retournee,
    .remboursee {
      background: #fef2f2;
      color: #b91c1c;
    }
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    text-align: left;
    font-size: 16px;
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

.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  h3 {
    margin-bottom: 1rem;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 22px;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .order-line {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;

    img {
      width: 60px;
      height: 60px;
      object-fit: contain;
    }

    .info p {
      margin: 4px 0;
      font-size: 14px;
    }
  }

  .order-header {
    background: #f9f9f9;
    padding: 16px;
    margin-bottom: 24px;
    border-radius: 8px;

    p {
      margin: 8px 0;
    }

    .status-tag {
      background: #fef08a;
      color: #92400e;
      padding: 4px 8px;
      border-radius: 5px;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 13px;
    }
  }

  .order-detail-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;

    th {
      background: #f1f1f1;
      padding: 12px;
      text-align: left;
      font-weight: bold;
      font-size: 14px;
    }

    td {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
      font-size: 14px;
      vertical-align: middle;

      img {
        width: 50px;
        height: 50px;
        object-fit: contain;
        border: 1px solid #eee;
        border-radius: 4px;
      }
    }
  }

  .order-total {
    text-align: right;
    margin-top: 16px;
    font-weight: bold;
    font-size: 16px;
  }
}

.toast-message {
  position: fixed;
  bottom: 32px;
  left: 32px;
  background: #38a169;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  animation: fadeInOut 2.5s ease-in-out;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
  }
}

@media (max-width: 1024px) {
  .profile-page {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;

    .user-card {
      display: none; // ou display: flex pour l'afficher
    }

    .nav-links {
      flex-direction: row;
      gap: 10px;

      button {
        flex: 1;
        padding: 10px;
        font-size: 14px;
        text-align: center;
      }

      .logout {
        flex: 0;
        padding: 10px;
      }
    }
  }

  .content {
    padding: 1.5rem;
  }

  .orders-table {
    font-size: 12px;

    th,
    td {
      padding: 10px;
    }
  }
}

@media (max-width: 600px) {
  .nav-links {
    flex-direction: column;
    align-items: stretch;
  }

  .orders-table {
    display: block;
    width: 100%;
    overflow-x: auto;
    border: 0;
    background: transparent;

    thead {
      display: none;
    }

    tbody {
      display: block;
      width: 100%;
    }

    tr {
      display: block;
      margin-bottom: 12px;
      background: white;
      border: 1px solid #eee;
      border-radius: 6px;
      padding: 10px;
    }

    td {
      display: flex;
      justify-content: space-between;
      padding: 8px;
      border: none;
      font-size: 14px;

      &::before {
        content: attr(data-label);
        font-weight: bold;
        margin-right: 12px;
        color: #666;
      }
    }
  }
}

@media (max-width: 1024px) {
  .profile-page {
    flex-direction: column;
    overflow-x: hidden;
  }

  .sidebar {
    width: 100% !important;
    max-width: 100vw;
    box-sizing: border-box;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    overflow-x: auto;

    .user-card {
      display: none;
    }

    .nav-links {
      display: flex;
      flex: 1;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: center;

      button {
        flex: 1 1 100px;
        white-space: nowrap;
        font-size: 14px;
        padding: 10px;
        text-align: center;
      }

      .logout {
        flex: 1 1 100%;
        text-align: center;
        color: #f44336;
      }
    }
  }
}

@media (max-width: 600px) {
  .order-detail-table {
    display: block;
    width: 100%;

    thead {
      display: none;
    }

    tbody {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    tr {
      display: flex;
      flex-direction: column;
      padding: 16px;
      border: 1px solid #eee;
      border-radius: 6px;
      background: #fff;
    }

    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      border: none;

      &:nth-child(2) {
        justify-content: center;
        img {
          margin: 8px 0;
        }
      }

      &::before {
        content: attr(data-label);
        font-weight: bold;
        color: #333;
        font-size: 13px;
      }
    }
  }

  .order-total {
    text-align: center;
    font-size: 15px;
  }

  .order-header {
    p {
      font-size: 14px;
    }

    .status-tag {
      font-size: 12px;
    }
  }
}
</style>
