'use client'

import Link from 'next/link'
import { useState } from 'react'

import ScrollArea from '../ScrollArea'

//XXX: Simulating db. Remove when implement db.
const shops = [
  {
    id: '91ed3317-f1fb-43c7-8daa-92d528fd88f2',
    name: 'McDonny',
    href: 'mcdonny'
  },
  {
    id: '126b2495-9e46-4285-940b-3ae338ec45a2',
    name: 'CFK',
    href: 'cfk'
  },
  {
    id: 'b5e1a2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c',
    name: 'Pizza Hub',
    href: 'pizza-hub'
  },
  {
    id: 'c4d3b2a1-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    name: 'Wok Star',
    href: 'wok-star'
  },
  {
    id: 'f1a2b3c4-d5e6-4a7b-8c9d-0e1f2a3b4c5d',
    name: 'Sushi Master',
    href: 'sushi-master'
  },
  {
    id: 'e5d4c3b2-a1f0-4a7b-8c9d-0e1f2a3b4c5d',
    name: 'Desert Queen',
    href: 'desert-queen'
  }
]

export default function ShopsSidebar() {
  const [activeShopId, setActiveShopId] = useState(
    '91ed3317-f1fb-43c7-8daa-92d528fd88f2'
  )

  return (
    <aside className="flex h-full min-h-fit w-72 flex-col gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="px-2 text-2xl font-extrabold tracking-tight text-gray-900">
        Shops
      </h3>

      <ScrollArea className="flex-1">
        <nav className="space-y-3">
          {shops.map((item) => (
            // <Link
            //   key={item.id}
            //   href={item.href}
            //   className={`flex h-20 items-center justify-center rounded-2xl border-2 px-4 text-lg font-semibold transition-all duration-200 ${
            //     isActive
            //       ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-md ring-1 ring-orange-500'
            //       : 'border-transparent bg-gray-50 text-gray-600 hover:border-gray-200 hover:bg-gray-100'
            //   } `}
            // >
            //   {item.name}
            // </Link>
            <button
              key={item.id}
              onClick={() => setActiveShopId(item.id)}
              className={`flex h-20 w-full items-center justify-center rounded-2xl border-2 px-4 text-lg font-semibold transition-all duration-200 ${
                item.id === activeShopId
                  ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-md ring-1 ring-orange-500'
                  : 'border-transparent bg-gray-50 text-gray-600 hover:border-gray-200 hover:bg-gray-100'
              } `}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}
