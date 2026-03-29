import { cache } from 'react'

import { Shop } from '@/types/shop'

export const getShops = cache(async (): Promise<Shop[]> => {
  const url = new URL(`${process.env.API_URL}/shops`)

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 }
  })

  if (!response.ok) throw new Error('Failed to fetch shops')
  return response.json()
})
