import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Shop } from './shop.entity'

@Injectable()
export class ShopsService {
  constructor(@InjectRepository(Shop) private repo: Repository<Shop>) {}

  async getShops() {
    return await this.repo.find()
  }
}
