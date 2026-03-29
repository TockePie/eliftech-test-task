import Link from 'next/link'

import { cn } from '@/lib/cn'
import { Shop } from '@/types/shop'

import { buttonVariants } from '../Button'
import ScrollArea from '../ScrollArea'

interface Props {
  shops: Shop[]
  activeShop: string
}

export default function ShopsSidebar({ shops, activeShop }: Props) {
  return (
    <aside className="flex h-full min-h-fit w-72 flex-col gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="px-2 text-2xl font-extrabold tracking-tight text-gray-900">
        Shops
      </h3>

      <ScrollArea className="flex-1 p-2">
        <nav className="space-y-3">
          {shops.map((item) => {
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
                    className: 'h-20 border-2'
                  })
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </aside>
  )
}
