import { z } from 'zod/mini'

export const OrderItemEntity = z.object({
  productId: z.uuid(),
  quantity: z.number()
})

export const OrderEntity = z.object({
  name: z.string().check(z.minLength(2, 'Name is too short')),
  email: z.email('Email is incorrect'),
  phone: z
    .string()
    .check(
      z.regex(/^\d+$/, 'Phone number should contain only numbers'),
      z.minLength(10, 'Phone number is too short')
    ),
  address: z.string().check(z.minLength(5, 'Enter your full address')),
  items: z.array(OrderItemEntity).check(z.minLength(1, 'Cart is empty'))
})
export type OrderEntityType = z.infer<typeof OrderEntity>
