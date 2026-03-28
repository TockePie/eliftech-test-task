import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common'

import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(
    @Query('shopId') shopId?: string,
    @Query('category') category?: string | string[],
    @Query('sortBy') sortBy?: 'price' | 'name',
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC'
  ) {
    const categories = Array.isArray(category)
      ? category
      : category
        ? [category]
        : undefined

    return await this.productsService.findAll(
      shopId,
      categories,
      sortBy,
      sortOrder
    )
  }

  @Get(':id')
  async getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productsService.findOne(id)
  }
}
