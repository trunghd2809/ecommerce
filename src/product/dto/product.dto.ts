import { IsString, IsNumber } from 'class-validator';
import { Type} from 'class-transformer';

export class CreateProductDTO {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  image: string;
  @IsNumber()
  @Type(()=>Number)
  price: number;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;