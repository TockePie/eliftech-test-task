import { cache } from 'react'

import { Product } from '@/types/product'

export const getProducts = cache(async (shopId: string): Promise<Product[]> => {
  const response = await fetch(
    process.env.API_URL + `/products?shopId=${shopId}`,
    { next: { revalidate: 3600 } }
  )

  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json()
})
