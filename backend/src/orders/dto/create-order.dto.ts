import { Type } from 'class-transformer'
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateNested
} from 'class-validator'

class OrderItemDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string

  @IsNumber()
  @Min(1)
  quantity: number
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  phone: string

  @IsNotEmpty()
  @IsString()
  address: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[]
}
