import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'

import { Product } from './product.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>
  ) {}

  async findAll(shopId?: string) {
    const options: FindManyOptions<Product> = {
      order: { name: { direction: 'ASC' } }
    }

    if (shopId) {
      options.where = { shopId }
    }

    return await this.repo.find(options)
  }

  async findOne(id: string) {
    return await this.repo.findOne({ where: { id } })
  }
}
