import { PropsWithChildren } from 'react'

import ShopsSidebar from '@/components/ShopsSidebar'
import { getShops } from '@/lib/get-shops'

interface Props extends PropsWithChildren {
  params: Promise<{ shop: string }>
}

export default async function ShopLayout({ children, params }: Props) {
  const { shop } = await params
  const shops = await getShops()

  return (
    <div className="m-4 flex h-[85vh] gap-5">
      <ShopsSidebar shops={shops} activeShop={shop} />

      <main className="h-full flex-1">{children}</main>
    </div>
  )
}
