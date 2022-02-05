import { defineStore } from 'pinia'
import { buyProducts, Product } from '../service/product'
import { useProductStore } from './product'
export type CartProduct = {
    count: number
} & Omit<Product, 'inventory'>

export const useCartStore = defineStore('cart', {
    state: () => {
        return {
            cartProducts: [] as CartProduct[],
            checkoutStatus: null as null | string
        }
    },
    getters: {
        totalPrice(state) {
            return state.cartProducts.reduce((total, item) => {
                return total + item.price * item.count
            }, 0)
        }
    },
    actions: {
        addProtuctToCart(product: Product) {
            if (product.inventory <= 0) return
            // const item = this.cartProducts.find(item => item.id === product.id)
            // if(item) {
            //     if(item.count + 1 > product.inventory) return
            //     item.count++
            //     return
            // }
            const productStore = useProductStore()
            productStore.decrementProduct(product)
            const item = this.cartProducts.find(item => item.id === product.id)
            if (item) {
                item.count++
                return
            }
            this.cartProducts.push({
                id: product.id,
                title: product.title,
                price: product.price,
                count: 1
            })
        },
        async checkout(products: CartProduct[]) {
            const res = await buyProducts(products)
            if (res) {
                this.cartProducts = []
                this.checkoutStatus = '结算成功'
            }
            else this.checkoutStatus = '结算失败'
        }
    }
})