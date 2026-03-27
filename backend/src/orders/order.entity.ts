import { OrderItems } from 'src/order-items/order-items.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

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
