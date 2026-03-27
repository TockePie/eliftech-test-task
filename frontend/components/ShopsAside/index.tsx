'use client'

import Link from 'next/link'
import { useState } from 'react'

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
  }
]

export default function ShopsAside() {
  const [activeShopId, setActiveShopId] = useState(
    '91ed3317-f1fb-43c7-8daa-92d528fd88f2'
  )

  return (
    <aside className="flex w-80 flex-col gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
      <h3 className="px-2 text-2xl font-extrabold tracking-tight text-gray-900">
        Shops
      </h3>

      <nav className="flex flex-col gap-3">
        {shops.map((item) => {
          const isActive = item.id === activeShopId

          return (
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
              className={`flex h-20 items-center justify-center rounded-2xl border-2 px-4 text-lg font-semibold transition-all duration-200 ${
                isActive
                  ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-md ring-1 ring-orange-500'
                  : 'border-transparent bg-gray-50 text-gray-600 hover:border-gray-200 hover:bg-gray-100'
              } `}
            >
              {item.name}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
