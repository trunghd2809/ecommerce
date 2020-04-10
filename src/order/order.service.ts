import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../types/order';
import { OrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private orderModel: Model<Order>
  ) {}

  async create(orderDTO: OrderDTO, userID: string) {
    const newOrder = {
      ...orderDTO,
      owner: userID,
    };
    const { _id } = await this.orderModel.create(newOrder);
    const order = await this.orderModel
      .findById(_id)
      .populate('products.product');
    const totalPrice = order.products.reduce((acc, product) => {
      const price = product.product.price * product.quantity;
      return acc + price;
    }, 0)
    await order.updateOne({ totalPrice });
    return await this.orderModel
      .findById(_id)
      .populate('owner')
      .populate('products.product');
  }
}
