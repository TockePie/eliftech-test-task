import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Product } from '@/types/product'

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  cart: CartItem[]
  addToCart: (product: Product) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const { cart } = get()

        const existingItemIndex = cart.findIndex(
          (item) => item.id === product.id
        )

        if (existingItemIndex > -1) {
          const newCart = [...cart]
          newCart[existingItemIndex] = {
            ...newCart[existingItemIndex],
            quantity: newCart[existingItemIndex].quantity + 1
          }

          set({ cart: newCart })
          return
        }

        set({ cart: [...cart, { ...product, quantity: 1 }] })
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          )
        }))
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId)
        }))
      },

      clearCart: () => set({ cart: [] }),

      getTotalPrice: () => {
        const { cart } = get()

        return cart.reduce(
          (sum, item) => sum + Number(item.price) * item.quantity,
          0
        )
      }
    }),
    {
      name: 'delivery-cart-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
