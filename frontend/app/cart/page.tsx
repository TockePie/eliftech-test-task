/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { createOrderAction } from '@/app/actions'
import { Button } from '@/components/Button'
import FormInput from '@/components/Cart/FormInput'
import ProductItem from '@/components/Cart/ProductItem'
import { useCartStore } from '@/store/useCartStore'
import { OrderEntity, OrderEntityType } from '@/types/order'

export default function CartPage() {
  const { cart, getTotalPrice, updateQuantity, clearCart, removeFromCart } =
    useCartStore()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<OrderEntityType>({
    resolver: zodResolver(OrderEntity),
    defaultValues: {
      items: cart.map((i) => ({ productId: i.id, quantity: i.quantity }))
    }
  })

  const onOrderSubmit = (data: OrderEntityType) => {
    startTransition(async () => {
      const result = await createOrderAction(data)
      if (result.success) {
        alert('Order created successfully')
        clearCart()
      } else {
        alert(result.message)
      }
    })
  }

  if (cart.length === 0) {
    return (
      <div className="p-20 text-center text-xl text-gray-500">
        Cart is empty
      </div>
    )
  }

  return (
    <div className="container mx-auto h-[85vh]">
      <form
        onSubmit={handleSubmit(onOrderSubmit)}
        className="m-4 grid h-full grid-cols-1 gap-5 lg:grid-cols-2"
      >
        <div className="space-y-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">Your information</h2>

          <div className="space-y-4">
            <FormInput
              label="Name"
              placeholder="John Doe"
              {...register('name')}
              error={errors.name?.message ? [errors.name.message] : undefined}
            />
            <FormInput
              label="Email"
              type="email"
              placeholder="mail@example.com"
              {...register('email')}
              error={errors.email?.message ? [errors.email.message] : undefined}
            />
            <FormInput
              label="Phone"
              type="tel"
              placeholder="380..."
              {...register('phone')}
              error={errors.phone?.message ? [errors.phone.message] : undefined}
            />
            <FormInput
              label="Address"
              placeholder="Example st., 48, Kyiv"
              {...register('address')}
              error={
                errors.address?.message ? [errors.address.message] : undefined
              }
            />
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Your order</h2>

          <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pr-2">
            {cart.map((item) => (
              <ProductItem
                key={item.id}
                item={item}
                onChangeFn={(e) => {
                  const val = parseInt(e.target.value)
                  updateQuantity(item.id, val)
                  setValue(
                    'items',
                    cart.map((i) =>
                      i.id === item.id ? { ...i, quantity: val } : i
                    ) as any
                  )
                }}
                removeFn={() => removeFromCart(item.id)}
              />
            ))}
          </div>

          <div className="mt-2 border-t border-t-gray-200 pt-4">
            <div className="mb-6 flex justify-between text-2xl font-black">
              <span>Total:</span>
              <span>{getTotalPrice().toFixed(2)} ₴</span>
            </div>

            <Button
              size="default"
              variant="primary"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Sending...' : 'Confirm order'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
