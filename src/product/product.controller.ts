import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { SellerGuards } from 'src/guards/seller.guards';
import { User } from 'src/utilities/user.decorator';
import { User as UserDocument } from '../types/user';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async index() {
    return await this.productService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), SellerGuards)
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Body() product: CreateProductDTO,
    @User() user: UserDocument,
    @UploadedFiles() files,
  ) {
    console.log(files);
    return await this.productService.create(product, user);
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string, 
    product: UpdateProductDTO,
    @User() user: UserDocument,
  ) {
    const { id: userID } = user;
    return await this.productService.update(product, id, userID);
  }

  @Delete(':id')
  async destroy(
    @Param('id') id: string,
    @User() user: UserDocument,
  ) {
    const { id: userID } = user;
    return await this.productService.destroy(id, userID);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: any) {
    console.log(file);
  }
}
