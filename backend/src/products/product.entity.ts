import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

import { OrderItems } from '../order-items/order-items.entity'
import { Shop } from '../shops/shop.entity'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Shop, (shop) => shop.products)
  @JoinColumn({ name: 'shopId' })
  shop: Shop

  @Column()
  shopId: string

  @OneToMany(() => OrderItems, (item) => item.order)
  orderItems: OrderItems[]

  @Column()
  name: string

  @Column()
  imageUrl: string

  @Column(() => Number)
  price: number
}
