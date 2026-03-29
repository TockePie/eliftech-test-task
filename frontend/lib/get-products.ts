import { cache } from 'react'

import { Product } from '@/types/product'

export const getProducts = cache(
  async (
    shopId: string,
    categories?: string[],
    sortBy?: string,
    sortOrder?: string
  ): Promise<Product[]> => {
    const url = new URL(`${process.env.API_URL}/products`)

    url.searchParams.append('shopId', shopId)

    if (categories?.length) {
      categories.forEach((cat) => url.searchParams.append('category', cat))
    }
    if (sortBy) {
      url.searchParams.append('sortBy', sortBy)
    }
    if (sortOrder) {
      url.searchParams.append('sortOrder', sortOrder)
    }

    const response = await fetch(url.toString(), { next: { revalidate: 3600 } })

    if (!response.ok) throw new Error('Failed to fetch products')
    return response.json()
  }
)
