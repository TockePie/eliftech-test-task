import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { OrderItem } from './order-item.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  address: string

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[]
}
