'use server'

import { OrderEntityType } from '@/types/order'

export async function createOrderAction(data: OrderEntityType) {
  try {
    const response = await fetch(`${process.env.API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) return { success: false, message: 'Server-side error' }

    return { success: true }
  } catch (error) {
    return { success: false, message: "Couldn't connect to the server" }
  }
}
