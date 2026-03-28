import Image from 'next/image'
import { ChangeEvent } from 'react'

import { CartItem, useCartStore } from '@/store/useCartStore'

interface Props {
  item: CartItem
  onChangeFn: (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void
}

export default function ProductItem({ item, onChangeFn }: Props) {
  const { removeFromCart } = useCartStore()

  return (
    <div className="flex gap-4 rounded-2xl border border-gray-50 bg-gray-50/50 p-4">
      <div className="relative h-20 w-20 shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-gray-900">{item.name}</h3>
          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="text-gray-400 transition-colors hover:text-red-500"
          >
            ✕
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-orange-600">{item.price} ₴</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => {
              onChangeFn(e)
            }}
            className="w-12 rounded border text-center"
          />
        </div>
      </div>
    </div>
  )
}
