import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
console.log('process.env', process.env.NODE_ENV);
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }),
    SharedModule, AuthModule, ProductModule, OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
