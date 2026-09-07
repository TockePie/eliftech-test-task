import Image from 'next/image'

import { Product } from '@/types/product'

import AddToCartBtn from './add-to-cart'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md">
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

      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 font-bold text-orange-600">{product.price} ₴</p>

          <span className="mt-3 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[12px] tracking-wider text-gray-600 uppercase">
            {product.category}
          </span>
        </div>

        <AddToCartBtn product={product} />
      </div>
    </div>
  )
}
