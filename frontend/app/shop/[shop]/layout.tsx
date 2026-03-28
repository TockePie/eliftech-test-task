import { PropsWithChildren } from 'react'

import ShopsSidebar from '@/components/ShopsSidebar'

interface Props extends PropsWithChildren {
  params: Promise<{ shop: string }>
}

export default async function ShopLayout({ children, params }: Props) {
  const { shop } = await params

  const response = await fetch(process.env.API_URL + '/shops')
  const shops = await response.json()

  return (
    <div className="m-4 flex h-[85vh]">
      <ShopsSidebar shops={shops} activeShop={shop} />

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
