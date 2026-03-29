'use client'

import { useCartStore } from '@/store/useCartStore'
import { Product } from '@/types/product'

import Button from '../Button'

export default function AddToCartBtn({ product }: { product: Product }) {
  const { cart, addToCart } = useCartStore()

  const isInCart = cart.some((item) => item.id === product.id)

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product)
    }
  }

  if (isInCart) {
    return (
      <Button
        size="md"
        variant="green-secondary"
        disabled
        className="mt-4 cursor-not-allowed"
      >
        In Cart
      </Button>
    )
  }

  return (
    <Button
      variant="primary"
      size="md"
      className="mt-4"
      onClick={handleAddToCart}
    >
      Add to Cart
    </Button>
  )
}
