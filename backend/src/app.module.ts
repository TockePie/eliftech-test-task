import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EnvironmentVariables } from '../types/env'
import { OrderItem } from './order-items/order-item.entity'
import { Order } from './orders/order.entity'
import { Product } from './products/product.entity'
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
    ShopsModule
  ]
})
export class AppModule {}
