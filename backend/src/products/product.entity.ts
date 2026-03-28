import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

import { OrderItem } from '../orders/order-item.entity'
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

  @OneToMany(() => OrderItem, (item) => item.product)
  orderItems: OrderItem[]

  @Column()
  name: string

  @Column()
  imageUrl: string

  @Column('decimal', { precision: 10, scale: 2 })
  price: number

  @Column()
  category: string
}
