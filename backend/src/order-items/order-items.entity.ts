import { Order } from 'src/orders/order.entity'
import { Product } from 'src/products/products.entity'
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

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
