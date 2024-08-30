import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { CLIENT_SERVICE, envs } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { 
        name: CLIENT_SERVICE, 
        transport: Transport.TCP,
        options: {
          host: envs.clientsMicroserviceHost,
          port: envs.clientsMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [ClientsController],
  providers: [],
})
export class ClientesModule {}
