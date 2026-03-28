import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EnvironmentVariables } from '../types/env'
import { Order } from './orders/order.entity'
import { OrderItem } from './orders/order-item.entity'
import { OrdersModule } from './orders/orders.module'
import { Product } from './products/product.entity'
import { ProductsModule } from './products/products.module'
import { Shop } from './shops/shop.entity'
import { ShopsModule } from './shops/shops.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL', { infer: true }),
        entities: [Shop, Product, Order, OrderItem],
        synchronize: true, // XXX: remove in production
        ssl: true,
        extra: {
          max: 10,
          ssl: { rejectUnauthorized: false }
        }
      })
    }),
    ShopsModule,
    ProductsModule,
    OrdersModule
  ]
})
export class AppModule {}
