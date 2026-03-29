'use client'

import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'

import { cn } from '@/lib/cn'
import { Shop } from '@/types/shop'

import { buttonVariants } from '../Button'
import ScrollArea from '../ScrollArea'
import { RatingRangeSlider } from './rating'

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
    <aside className="flex h-full min-h-fit w-72 flex-col gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
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
            filteredShops.map((item) => {
              const isActive = activeShop === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    buttonVariants({
                      variant: isActive ? 'outline' : 'secondary',
                      size: 'default',
                      fullWidth: true,
                      className:
                        'flex h-20 flex-col items-start justify-center gap-1 border-2 px-4'
                    })
                  )}
                >
                  <span className="text-base font-semibold">{item.name}</span>
                  <div className="flex items-center gap-1 text-xs font-medium text-orange-500">
                    <span className="text-lg">★</span>
                    {item.rating || 'N/A'}
                  </div>
                </Link>
              )
            })
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
