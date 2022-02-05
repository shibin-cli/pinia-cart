import { CartProduct } from "../store/cart"

export interface Product{
    id: number
    title: string
    price: number //价格
    inventory: number //库存
}

const _products: Product[] = [
    { 'id': 1, 'title': 'iPad 4 Mini', 'price': 500.01, 'inventory': 2 },
    { 'id': 2, 'title': 'H&M T-Shirt White', 'price': 10.99, 'inventory': 10 },
    { 'id': 3, 'title': 'Charli XCX - Sucker CD', 'price': 19.99, 'inventory': 5 }
]
export const getProducts = async () =>{
    return _products
}
export const buyProducts = async (products: CartProduct[]) => {
    return Math.random() > 0.5
}