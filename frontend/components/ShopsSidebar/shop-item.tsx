import Link from 'next/link'

import { cn } from '@/lib/cn'
import { Shop } from '@/types/shop'

import { buttonVariants } from '../Button'

export default function ShopItem({
  shop,
  activeShop
}: {
  shop: Shop
  activeShop: string
}) {
  const isActive = activeShop === shop.href

  return (
    <Link
      key={shop.id}
      href={shop.href}
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
      <span className="text-base font-semibold">{shop.name}</span>
      <div className="flex items-center gap-1 text-xs font-medium text-orange-500">
        <span className="text-lg">★</span>
        {shop.rating || 'N/A'}
      </div>
    </Link>
  )
}
