import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ClientesModule } from './clientes/clients.module';

@Module({
  imports: [ProductsModule, OrdersModule, ClientesModule],
})
export class AppModule {}
