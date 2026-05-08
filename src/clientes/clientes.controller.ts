import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente', description: 'Registra un nuevo cliente en el sistema' })
  @ApiBody({ type: CreateClienteDto })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los clientes', description: 'Retorna el listado completo de clientes registrados' })
  @ApiResponse({ status: 200, description: 'Listado de clientes' })
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por ID', description: 'Retorna los datos del cliente incluyendo sus órdenes' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: Number })
  @ApiResponse({ status: 200, description: 'Cliente encontrado' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar datos del cliente', description: 'Actualiza parcialmente los datos de un cliente existente' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: Number })
  @ApiBody({ type: UpdateClienteDto })
  @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(id, updateClienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente', description: 'Elimina (soft delete) un cliente del sistema' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: Number })
  @ApiResponse({ status: 200, description: 'Cliente eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.remove(id);
  }
}
