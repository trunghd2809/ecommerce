import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { OrderDTO } from './dto/order.dto';
import { User } from 'src/utilities/user.decorator';
import { User as UserDocument } from '../types/user';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() orderDTO: OrderDTO, @User() { id } : UserDocument) {
    return await this.orderService.create(orderDTO, id);
  }
}
