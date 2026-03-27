import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Order } from '../orders/order.entity'
import { Product } from '../products/product.entity'

export class OrderItems {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: 'orderId' })
  order: Order

  @Column()
  orderId: string

  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn({ name: 'productId' })
  product: Product

  @Column()
  productId: string
}
