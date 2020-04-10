import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDefined } from 'class-validator';
import { IsArrayOfInstancesOf } from '../../shared/custom.validate';

class ProductOrder {
  @IsString()
  product: string;
  @IsNumber()
  @IsDefined()
  @Type(() => Number)
  quantity: number;
}

export class OrderDTO {
  @IsArrayOfInstancesOf(ProductOrder)
  @Type(() => ProductOrder)
  products: ProductOrder[];
}