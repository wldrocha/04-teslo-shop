import { CartProduct } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  cart: CartProduct[]
  addProductToCart: (product: CartProduct) => void
  //   removeProductFromCart: (productId: string) => void
  //   updateProductQuantity: (productId: string, quantity: number) => void
}

export const useCartStore = create<State>()(
  // persist
  (set, get) => ({
    cart: [],
    addProductToCart: (product: CartProduct) => {
        const { cart } = get()
        console.log("🚀 ~ cart:", cart)
        console.log("🚀 ~ product:", product)
      const isProductInCart = cart.some((item) => item.id === product.id && item.size === product.size)

      if (!isProductInCart) {
        set({ cart: [...cart, product] })
      }
      const updatedCartProducts = cart.map((item) => {
        if (item.id === product.id && item.size === product.size) {
          return { ...item, quantity: item.quantity + product.quantity }
        }
        return item
      })
      set({ cart: updatedCartProducts })
    }
  })
)
