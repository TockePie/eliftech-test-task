import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, In, Repository } from 'typeorm'

import { Product } from './product.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>
  ) {}

  async findAll(
    shopId?: string,
    categories?: string[],
    sortBy: 'price' | 'name' = 'name',
    sortOrder: 'ASC' | 'DESC' = 'ASC'
  ) {
    const options: FindManyOptions<Product> = {
      where: {},
      order: { [sortBy]: sortOrder }
    }

    if (shopId) {
      options.where = { ...options.where, shopId }
    }

    if (categories && categories.length > 0) {
      options.where = { ...options.where, category: In(categories) }
    }

    return await this.repo.find(options)
  }

  async findOne(id: string) {
    return await this.repo.findOne({ where: { id } })
  }
}
