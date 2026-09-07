'use server'

import { z } from 'zod/mini'

import { api } from '@/api/instance'
import { OrderEntity } from '@/types/order'

export type OrderActionState = {
  success?: boolean
  message?: string
  errors?: Record<string, string[]>
}

export async function createOrderAction(
  _prevState: OrderActionState,
  formData: FormData
): Promise<OrderActionState> {
  const rawItems = formData.get('items')
  let items: unknown[] = []
  if (typeof rawItems === 'string') {
    try {
      items = JSON.parse(rawItems)
    } catch {
      return { success: false, message: 'Invalid cart data' }
    }
  }

  const rawFormData = {
    ...Object.fromEntries(formData),
    items
  }

  const validated = OrderEntity.safeParse(rawFormData)
  if (!validated.success) {
    const tree = z.treeifyError(validated.error)
    const formattedErrors: Record<string, string[]> = {}

    if (tree.properties) {
      for (const [key, val] of Object.entries(tree.properties)) {
        if (val && 'errors' in val && Array.isArray(val.errors)) {
          formattedErrors[key] = val.errors
        }
      }
    }

    return {
      success: false,
      errors: formattedErrors
    }
  }

  return await api
    .post('/orders', {
      json: validated.data
    })
    .then(() => ({ success: true }))
    .catch(async (error) => {
      const errorBody = error.response ? await error.response.text() : ''
      return {
        success: false,
        message: `Posting order has failed. Reason: ${error.message} - ${errorBody}`
      }
    })
}
