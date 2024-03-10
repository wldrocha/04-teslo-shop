import { CartProduct } from '@/interfaces'
import { Size } from '@prisma/client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  cart: CartProduct[]
  addProductToCart: (product: CartProduct) => void
  getTotalItemsInCart: () => number
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  //   removeProductFromCart: (productId: string) => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItemsInCart: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0)
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get()

        const productInCart = cart.some((item) => item.id === product.id && item.size === product.size)

        if (!productInCart) {
          set({ cart: [...cart, product] })
          return
        }

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity }
          }

          return item
        })

        set({ cart: updatedCartProducts })
      },
      updateProductQuantity: (product, quantity) => {
        const { cart: itemsInCart } = get()
        // // console.log("🚀 ~ cart:", cart)

        const updatedCartProducts = itemsInCart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity }
          }
          return item
        })

        set({ cart: updatedCartProducts })
      }
    }),
    { name: 'shoppping-cart' }
  )
)
