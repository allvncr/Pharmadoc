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
            <tr v-for="order in orderStore.orders" :key="order.id">
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
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useOrderStore } from '@/stores/orderStore'
import { format } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

const authStore = useAuthStore()
const orderStore = useOrderStore()

const activeTab = ref('personal')

const userInitials = (authStore.user.firstName[0] + authStore.user.lastName[0]).toUpperCase()

const formatDate = (dateStr) => {
  return format(new Date(dateStr), 'dd MMMM yyyy, H:m', { locale: frLocale })
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
</style>
