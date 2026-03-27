import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

import { Order } from '../orders/order.entity'
import { Product } from '../products/product.entity'

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Order, (order) => order.orderItem)
  @JoinColumn({ name: 'orderId' })
  order: Order

  @Column()
  orderId: string

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product

  @Column()
  productId: string
}
