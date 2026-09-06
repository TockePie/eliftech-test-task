import { cache } from 'react'

import { Shop } from '@/types/shop'

import { api } from './instance'

export const getShops = cache(async () => {
  return await api
    .get('/shops', {
      next: { revalidate: 3600 }
    })
    .json<Shop[]>()
})
