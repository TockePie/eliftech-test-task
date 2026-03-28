import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, FindManyOptions, Repository } from 'typeorm'

import { Shop } from './shop.entity'

@Injectable()
export class ShopsService {
  constructor(@InjectRepository(Shop) private repo: Repository<Shop>) {}

  async getShops(minRating?: number, maxRating?: number) {
    const options: FindManyOptions<Shop> = {}

    if (minRating !== undefined && maxRating !== undefined) {
      options.where = {
        rating: Between(minRating, maxRating)
      }
    }

    return await this.repo.find(options)
  }
}
