import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { Product } from '../products/product.entity'
import { CreateOrderDto } from './dto/create-order.dto'
import { Order } from './order.entity'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const productIds = createOrderDto.items.map((item) => item.productId)

    const products = await this.productRepo.findBy({
      id: In(productIds)
    })

    const productPriceMap = new Map<string, number>(
      products.map((p) => [p.id, Number(p.price)])
    )

    const total = createOrderDto.items.reduce((sum: number, item) => {
      const price = productPriceMap.get(item.productId)

      if (price === undefined) {
        throw new BadRequestException(`Product ${item.productId} not found`)
      }

      return sum + price * item.quantity
    }, 0)

    const order = this.orderRepo.create({
      ...createOrderDto,
      totalPrice: total
    })

    return await this.orderRepo.save(order)
  }
}
