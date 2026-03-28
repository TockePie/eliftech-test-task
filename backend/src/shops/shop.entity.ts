import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Product } from '../products/product.entity'

@Entity()
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  href: string

  @OneToMany(() => Product, (product) => product.shop)
  products: Product[]

  @Column('decimal', { precision: 2, scale: 1, default: 0 })
  rating: number
}
