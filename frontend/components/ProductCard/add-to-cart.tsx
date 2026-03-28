'use client'

import { useCartStore } from '@/store/useCartStore'
import { Product } from '@/types/product'

export default function AddToCartBtn({ product }: { product: Product }) {
  const { cart, addToCart } = useCartStore()

  const isInCart = cart.some((item) => item.id === product.id)

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product)
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isInCart}
      className={`mt-4 w-full rounded-xl py-2 font-semibold transition-all duration-200 ${
        isInCart
          ? 'cursor-not-allowed bg-green-100 text-green-700'
          : 'cursor-pointer bg-orange-500 text-white shadow-sm shadow-orange-100 hover:bg-orange-600 active:scale-95'
      }`}
    >
      {isInCart ? 'In Cart' : 'Add to Cart'}
    </button>
  )
}
