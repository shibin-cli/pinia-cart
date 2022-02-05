import { defineStore } from 'pinia'
import { Product, getProducts } from '../service/product'
export const useProductStore = defineStore('products', {
    state: () => {
        return {
            products: [] as Product[]
        }
    },
    getters: {
        
    },
    actions: {
        async loadAllProducts(){
            const products = await getProducts()
            this.products = products
        },
        decrementProduct(product: Product){
            const item = this.products.find(item => item.id === product.id)
            if(item) item.inventory--
        }
    }
})