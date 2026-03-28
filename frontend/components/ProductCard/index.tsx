import Image from 'next/image'

import { Product } from '@/types/product'

import AddToCartBtn from './add-to-cart'

export default function ProductCard({ product }: { product: Product }) {
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
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 font-bold text-orange-600">{product.price} ₴</p>

        <AddToCartBtn product={product} />
      </div>
    </div>
  )
}
