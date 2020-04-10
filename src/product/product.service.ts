import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/types/product';
import { User } from 'src/types/user';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().populate('owner');
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findById(id).populate('owner');
  }

  async create(productDTO: any, user: User): Promise<Product> {
    const product = await this.productModel.create({
      ...productDTO,
      owner: user,
    });
    await product.save();
    return product.populate('owner');
  }

  async update(productDTO: any, id: string, userID: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (userID !== product.owner.toString()) {
      throw new HttpException(
        'You do not own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await product.update(productDTO);
    return await this.productModel.findById(id).populate('owner');
  }

  async destroy(id: string, userID: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    await product.remove();
    if (userID !== product.owner.toString()) {
      throw new HttpException(
        'You do not own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return product;
  }
}
