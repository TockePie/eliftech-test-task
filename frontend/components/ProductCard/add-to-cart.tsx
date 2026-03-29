'use client'

import { useCartStore } from '@/store/useCartStore'
import { Product } from '@/types/product'

import { Button } from '../Button'

export default function AddToCartBtn({ product }: { product: Product }) {
  const { cart, addToCart } = useCartStore()

  const isInCart = cart.some((item) => item.id === product.id)

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product)
    }
  }

  return (
    <Button
      variant={isInCart ? 'green-secondary' : 'primary'}
      size="md"
      className="mt-4"
      onClick={handleAddToCart}
    >
      {isInCart ? 'Added' : 'Add to Cart'}
    </Button>
  )
}
