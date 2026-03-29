import Image from 'next/image'
import { ChangeEvent } from 'react'

import { CartItem } from '@/store/useCartStore'

interface Props {
  item: CartItem
  onChangeFn: (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void
  removeFn: () => void
}

export default function ProductItem({ item, onChangeFn, removeFn }: Props) {
  return (
    <div className="flex gap-4 rounded-2xl border border-gray-50 bg-gray-50/50 p-4">
      <div className="relative size-20 shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-gray-900">{item.name}</h3>
          <button
            type="button"
            onClick={removeFn}
            className="size-8 cursor-pointer rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500"
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
