import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { CreateOrderDto,  } from './dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { OrderStatus } from './enum/order.enum';
import { StatusDto } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try{
      const order = await firstValueFrom(
        this.ordersClient.send('createOrder', createOrderDto)
      )
      return order
    }catch(e){
      throw new BadRequestException(e)
    }
    // return this.ordersClient.send('createOrder', createOrderDto)
  }

  @Get()
  findAll() {
    return this.ordersClient.send('findAllOrders', {})
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try{
      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', {id})
      )
      return order
    }catch(e){
      throw new BadRequestException(e);
    }
  }

  @Patch(':id')
  async changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: StatusDto
  ) {
    try{
      const order = await firstValueFrom(
        this.ordersClient.send('changeOrderStatus', {id, status: statusDto.status})
      )
      return order
    }catch(e){
      throw new BadRequestException(e)
    }
  }

}
