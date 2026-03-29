import { Controller, Get } from '@nestjs/common'

import { ShopsService } from './shops.service'

@Controller('shops')
export class ShopsController {
  constructor(private shopsService: ShopsService) {}

  @Get()
  async getShops() {
    return await this.shopsService.getShops()
  }
}
