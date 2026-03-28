import { Controller, Get, Query } from '@nestjs/common'

import { ShopsService } from './shops.service'

@Controller('shops')
export class ShopsController {
  constructor(private shopsService: ShopsService) {}

  @Get()
  async getShops(
    @Query('minRating') minRating?: string,
    @Query('maxRating') maxRating?: string
  ) {
    return await this.shopsService.getShops(
      minRating ? parseFloat(minRating) : undefined,
      maxRating ? parseFloat(maxRating) : undefined
    )
  }
}
