import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import e from 'express';
import { firstValueFrom } from 'rxjs';
import { PRODUCT_SERVICE } from '../config';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { RestarStockDto } from './dto/restarStock.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'createProduct' }, createProductDto),
      );
      return product;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get()
  findAllProducts() {
    return this.productsClient.send({ cmd: 'findAllProducts' }, {});
  }

  @Get(':id')
  async findProductsById(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        //firstValueFrom captura el observable de la peticion
        this.productsClient.send({ cmd: 'findOneProduct' }, { id }),
      );
      return product;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Delete(':id')
  async deleteProducts(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'deleteProduct' }, { id }),
      );
      return product;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Patch(':product_id')
  async patchProduct(
    @Body() body: UpdateProductDto,
    @Param('product_id', ParseIntPipe) product_id: number,
  ) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send(
          { cmd: 'updateProduct' },
          {
            product_id,
            ...body,
          },
        ),
      );
      return product;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Patch('restarStock/:product_id')
  async restarStock(
    @Param('product_id', ParseIntPipe) product_id: number,
    @Query('cantidad', ParseIntPipe) cantidad: number,
  ) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send(
          { cmd: 'restarStock' },
          {
            product_id,
            cantidad,
          },
        ),
      );
      return product;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
