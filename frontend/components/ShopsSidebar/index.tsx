import Link from 'next/link'

import { Shop } from '@/types/shop'

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
          {shops.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex h-20 items-center justify-center rounded-2xl border-2 px-4 text-lg font-semibold transition-all duration-200 ${
                activeShop === item.href
                  ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-md ring-1 ring-orange-500'
                  : 'border-transparent bg-gray-50 text-gray-600 hover:border-gray-200 hover:bg-gray-100'
              } `}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}
