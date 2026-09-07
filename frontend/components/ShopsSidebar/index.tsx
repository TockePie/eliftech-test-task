'use client'

import { useCallback, useMemo, useState } from 'react'

import { Shop } from '@/types/shop'

import ScrollArea from '../ScrollArea'
import { RatingRangeSlider } from './rating'
import ShopItem from './shop-item'

interface Props {
  shops: Shop[]
  activeShop: string
}

export default function ShopsSidebar({ shops, activeShop }: Props) {
  const [filterRange, setFilterRange] = useState({ min: 1.0, max: 5.0 })

  const handleRangeChange = useCallback(
    (range: { min: number; max: number }) => {
      setFilterRange(range)
    },
    []
  )

  const filteredShops = useMemo(() => {
    return shops.filter((shop) => {
      const rating = shop.rating ?? 0
      return rating >= filterRange.min && rating <= filterRange.max
    })
  }, [shops, filterRange])

  return (
    <aside className="flex h-auto w-full flex-col gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg lg:h-full lg:w-72">
      <div className="space-y-4">
        <h3 className="px-2 text-2xl font-extrabold tracking-tight text-gray-900">
          Shops
        </h3>

        <div className="px-2">
          <RatingRangeSlider onChange={handleRangeChange} />
        </div>
      </div>

      <ScrollArea className="flex-1 p-2">
        <nav className="space-y-3">
          {filteredShops.length > 0 ? (
            filteredShops.map((item) => (
              <ShopItem key={item.id} shop={item} activeShop={activeShop} />
            ))
          ) : (
            <p className="py-10 text-center text-sm text-gray-400">
              No shops in this range
            </p>
          )}
        </nav>
      </ScrollArea>
    </aside>
  )
}
