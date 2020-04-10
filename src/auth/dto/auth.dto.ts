import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class LoginDTO {
  @IsString()
  username: string;
  @IsString()
  password: string;
}

export class RegisterDTO {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  seller?: boolean;
}