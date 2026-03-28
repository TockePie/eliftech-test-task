import z from 'zod'

export const OrderItemEntity = z.object({
  productId: z.uuid(),
  quantity: z.number()
})

export const OrderEntity = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.email('Email is incorrect'),
  phone: z
    .string()
    .regex(/^\d+$/, 'Phone number should contain only numbers')
    .min(10, 'Phone number is too short'),
  address: z.string().min(5, 'Enter your full address'),
  items: z.array(OrderItemEntity).min(1, 'Кошик порожній')
})
export type OrderEntityType = z.infer<typeof OrderEntity>
