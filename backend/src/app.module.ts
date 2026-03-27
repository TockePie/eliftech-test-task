import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EnvironmentVariables } from '../types/env'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL', { infer: true }),
        autoLoadEntities: true,
        synchronize: true, // XXX: remove in production
        ssl: true
      })
    })
  ]
})
export class AppModule {}
