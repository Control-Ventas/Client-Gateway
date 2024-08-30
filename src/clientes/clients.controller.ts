import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CLIENT_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';

@Controller('clients')
export class ClientsController {
  constructor(@Inject(CLIENT_SERVICE) private readonly clientsClient: ClientProxy,) { }
  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    try {
      const client = await firstValueFrom(
        this.clientsClient.send({cmd: 'createClient'}, createClientDto)
      )
      return client
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

  @Get()
  findAll() {
    return this.clientsClient.send('findAllClients', {})
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const client = await firstValueFrom(
        this.clientsClient.send('findOneClient', { id })
      )
      return client
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Patch(':clientId')
  async update(
    @Param('clientId', ParseIntPipe) clientId: number,
    @Body() updateClientDto: UpdateClientDto
  ) {
    try {
      const client = await firstValueFrom(
        this.clientsClient.send('updateClient', { clientId, ...updateClientDto })
      )
      return client
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const client = await firstValueFrom(
        this.clientsClient.send('removeClient', { id })
      )
      return client
    }catch(e){
      throw new BadRequestException(e)
    }
  }
}
