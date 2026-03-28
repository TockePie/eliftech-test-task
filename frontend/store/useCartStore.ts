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
        const { cart, updateQuantity } = get()

        const existingItem = cart.find((item) => item.id === product.id)
        if (existingItem) {
          updateQuantity(existingItem.id, existingItem.quantity)
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] })
        }
      },

      updateQuantity: (productId, quantity) => {
        set({
          cart: get().cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          )
        })
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) })
      },

      clearCart: () => set({ cart: [] }),

      getTotalPrice: () => {
        return get().cart.reduce(
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
