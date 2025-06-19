<template>
  <main>
    <div class="container">
      <div class="checkout-container">
        <div class="checkout-left">
          <section class="checkout-section">
            <div class="section-header">
              <span class="section-number">1</span>
              <h3>Numéro de téléphone</h3>
              <!-- <button class="section-action">+ Modifier</button> -->
            </div>
            <input
              v-model="contact"
              type="text"
              placeholder="+225 07 45 12 34 56"
              class="section-input"
            />
          </section>

          <section class="checkout-section">
            <div class="section-header">
              <span class="section-number">2</span>
              <h3>Adresse de livraison</h3>
              <!-- <button class="section-action">+ Ajouter</button> -->
            </div>
            <textarea
              placeholder="Cocody Angré, Abidjan, Côte d’Ivoire"
              v-model="shippingAddress"
              class="section-textarea"
              rows="2"
            ></textarea>
          </section>
          <section class="checkout-section">
            <div class="section-header">
              <span class="section-number">3</span>
              <h3>Note de commande</h3>
            </div>
            <textarea
              v-model="orderNote"
              class="section-textarea"
              rows="4"
              placeholder="Ex. Laisser à la loge, appeler avant livraison, etc."
            ></textarea>
          </section>
        </div>

        <div class="checkout-right">
          <h4>Votre commande</h4>
          <ul class="order-list">
            <li v-for="item in useCart.items" :key="item.id">
              <span>{{ item.quantity }} × {{ item.name }}</span>
              <span>{{ (item.newPrice * item.quantity).toLocaleString('fr-CI') }} FCFA</span>
            </li>
          </ul>
          <div class="order-summary">
            <div>
              <span>Sous-total</span
              ><span>{{ useCart.totalPrice.toLocaleString('fr-CI') }} FCFA</span>
            </div>
            <div><span>Livraison</span><span>À calculer</span></div>
          </div>
          <button class="checkout-button">Valider la commande</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const contact = ref('')
const shippingAddress = ''
const orderNote = ref('')
import { useCartStore } from '../stores/cart'

const useCart = useCartStore()
</script>

<style lang="scss" scoped>
main {
  background-color: #f9fafb;
  min-height: calc(100vh - 80px);
}
.checkout-container {
  display: flex;
  gap: 2rem;
  padding: 2rem;

  .checkout-left {
    flex: 2;

    .checkout-section {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;

        .section-number {
          background: $blue;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }

        h3 {
          flex: 1;
          margin-left: 0.5rem;
          font-size: 1rem;
          font-weight: 400;
        }

        .section-action {
          font-size: 0.85rem;
          color: $blue;
          background: none;
          border: none;
          cursor: pointer;
        }
      }

      .section-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 6px;

        &:active,
        &:focus {
          outline: 1px solid $blue;
        }
      }

      .section-box {
        border: 1px solid $blue;
        border-radius: 6px;
        padding: 0.75rem;
        font-size: 0.9rem;
        background: #f0fdf4;

        p {
          margin-top: 0.25rem;
        }
      }

      .section-textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 0.95rem;
        resize: vertical;

        &:active,
        &:focus {
          outline: 1px solid $blue;
        }
      }
    }
  }

  .checkout-right {
    flex: 1;
    padding: 1rem;
    height: fit-content;

    h4 {
      margin-bottom: 1rem;
      font-weight: 400;
    }

    .order-list {
      list-style: none;
      padding: 0;
      margin: 0 0 1rem 0;

      li {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        font-size: 0.9rem;
        border-bottom: 1px solid #eee;
      }
    }

    .order-summary {
      div {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        font-size: 0.9rem;
      }
    }

    .checkout-button {
      margin-top: 1rem;
      width: 100%;
      background: $blue;
      color: white;
      padding: 0.75rem;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
