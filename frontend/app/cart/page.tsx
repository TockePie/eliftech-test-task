'use client'

import { useActionState, useEffect } from 'react'

import { createOrderAction, OrderActionState } from '@/api/create-order'
import { Button } from '@/components/Button'
import FormInput from '@/components/Cart/FormInput'
import ProductItem from '@/components/Cart/ProductItem'
import { useCartStore } from '@/store/useCartStore'

export const initialOrderState: OrderActionState = {}

export default function CartPage() {
  const { cart, getTotalPrice, updateQuantity, clearCart, removeFromCart } =
    useCartStore()

  const [state, formAction, isPending] = useActionState(
    onSubmit,
    initialOrderState
  )

  async function onSubmit(prevState: OrderActionState, formData: FormData) {
    const itemsPayload = cart.map((i) => ({
      productId: i.id,
      quantity: i.quantity
    }))
    formData.set('items', JSON.stringify(itemsPayload))

    return await createOrderAction(prevState, formData)
  }

  useEffect(() => {
    if (state.success) {
      alert('Order created successfully')
      clearCart()
    } else if (state.message) {
      alert(state.message)
    }
  }, [state, clearCart])

  if (cart.length === 0) {
    return (
      <div className="p-20 text-center text-xl text-gray-500">
        Cart is empty
      </div>
    )
  }

  return (
    <div className="container mx-auto lg:h-[85vh]">
      <form
        action={formAction}
        className="m-4 grid h-full grid-cols-1 gap-5 lg:grid-cols-2"
      >
        <div className="space-y-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">Your information</h2>

          <div className="space-y-4">
            <FormInput
              label="Name"
              name="name"
              placeholder="John Doe"
              required
              error={state.errors?.name}
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              placeholder="mail@example.com"
              required
              error={state.errors?.email}
            />
            <FormInput
              label="Phone"
              name="phone"
              type="tel"
              placeholder="380..."
              required
              error={state.errors?.phone}
            />
            <FormInput
              label="Address"
              name="address"
              placeholder="Example st., 48, Kyiv"
              required
              error={state.errors?.address}
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
                onChangeFn={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value, 10))
                }
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
