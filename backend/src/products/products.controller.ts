import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common'

import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(@Query('shopId') shopId?: string) {
    return await this.productsService.findAll(shopId)
  }

  @Get(':id')
  async getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsService.findOne(id)
  }
}
