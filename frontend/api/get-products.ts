import { cache } from 'react'

import { Product } from '@/types/product'

import { api } from './instance'

export const getProducts = cache(
  async (
    shopId: string,
    categories?: string[],
    sortBy?: string,
    sortOrder?: string
  ) => {
    const searchParams = new URLSearchParams()

    if (shopId) searchParams.set('shopId', String(shopId))
    if (sortBy) searchParams.set('sortBy', sortBy)
    if (sortOrder) searchParams.set('sortOrder', sortOrder)

    if (categories?.length) {
      categories.forEach((cat) => searchParams.append('category', cat))
    }

    return await api
      .get('/products', {
        searchParams
      })
      .json<Product[]>()
  }
)
