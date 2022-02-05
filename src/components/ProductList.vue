<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductStore } from '../store/product'
import { useCartStore} from '../store/cart'

const productStore = useProductStore()
const cartStore = useCartStore()
const { products } = storeToRefs(productStore)
productStore.loadAllProducts()
</script>
<template>
  <ul>
    <li v-for="product in products" :key="product.id">
      {{product.title}} - {{product.price}}
      <br>
      <button @click="cartStore.addProtuctToCart(product)" :disabled="!product.inventory">
        Add to cart
      </button>
    </li>
  </ul>
</template>
