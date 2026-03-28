'use client'

import Image from 'next/image'

import { Product } from '@/types/product'

export default function ProductCard({ product }: { product: Product }) {
  const handleAddToCart = () => {
    // Тут буде логіка корзини
    console.log('Added to cart:', product.name)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-1 font-bold text-orange-600">{product.price} ₴</p>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full rounded-lg bg-orange-500 py-2 text-white transition-colors hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
