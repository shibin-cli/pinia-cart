<script setup lang="ts">
import { storeToRefs} from 'pinia'
import { useCartStore} from '../store/cart'

const store = useCartStore()
const { cartProducts, checkoutStatus } = storeToRefs(store)
</script>
<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p>
      <i>Please add some products to cart.</i>
    </p>
    <ul>
      <li v-for="cart in cartProducts">
         {{cart.title}} - {{cart.price}} x {{cart.count}}
      </li>
    </ul>
    <p>Total: {{store.totalPrice}}</p>
    <p><button :disabled="!cartProducts.length" @click="store.checkout(cartProducts)">Checkout</button></p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>
