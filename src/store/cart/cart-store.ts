import { CartProduct } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  cart: CartProduct[]
  addProductToCart: (product: CartProduct) => void
  getTotalItemsInCart: () => number
  getSummaryInformation: () => { subTotal: number; taxes: number; total: number; itemsInCart: number }
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  removeProductFromCart: (product: CartProduct) => void
  clearCart: () => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItemsInCart: () => {
        const { cart, getTotalItemsInCart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0)
      },
      getSummaryInformation: () => {
        const { cart, getTotalItemsInCart } = get()
        const subTotal = cart.reduce((subTotal, product) => subTotal + product.quantity * product.price, 0)
        const taxes = subTotal * 0.15
        const total = subTotal + taxes
        const itemsInCart = getTotalItemsInCart()
        return {
          subTotal,
          taxes,
          total,
          itemsInCart
        }
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
      },
      removeProductFromCart: (product) => {
        console.log('🚀 ~ product:', product)
        const { cart: itemsInCart } = get()

        const updatedCartProducts = itemsInCart.filter(
          (item) => !(item.id === product.id && item.size === product.size)
        )
        set({ cart: updatedCartProducts })
      },
      clearCart: () => {
        set({ cart: [] })
      }
    }),
    { name: 'shoppping-cart' }
  )
)
