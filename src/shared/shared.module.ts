import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggingInterceptor } from './logging.interceptor';
import { ValidationPipe } from './validation.pipe';
import { TransformInterceptor } from './transform.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [
    UserService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    { 
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  exports: [UserService],
})
export class SharedModule {}
