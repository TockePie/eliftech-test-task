import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { OrderItems } from '../order-items/order-items.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column(() => Number)
  phone: number

  @Column()
  address: string

  @Column(() => Number)
  totalPrice: number

  @OneToMany(() => OrderItems, (item) => item.order)
  orderItems: OrderItems[]
}
