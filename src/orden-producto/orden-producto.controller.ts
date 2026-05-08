import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrdenProductoService } from './orden-producto.service';
import { CreateOrdenProductoDto } from './dto/create-orden-producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden-producto.dto';

@ApiTags('orden-producto')
@Controller('orden_producto')
export class OrdenProductoController {
  constructor(private readonly ordenProductoService: OrdenProductoService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar producto a una orden', description: 'Crea una relación entre una orden y un producto (tabla intermedia INCLUYE)' })
  @ApiBody({ type: CreateOrdenProductoDto })
  @ApiResponse({ status: 201, description: 'Producto agregado a la orden exitosamente' })
  @ApiResponse({ status: 404, description: 'Orden o producto no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createOrdenProductoDto: CreateOrdenProductoDto) {
    return this.ordenProductoService.create(createOrdenProductoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los registros de orden_producto', description: 'Retorna todos los registros de la tabla intermedia con sus relaciones' })
  @ApiResponse({ status: 200, description: 'Listado de orden_producto' })
  findAll() {
    return this.ordenProductoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro orden_producto por ID', description: 'Retorna el registro con la orden y el producto relacionados' })
  @ApiParam({ name: 'id', description: 'ID del registro orden_producto', type: Number })
  @ApiResponse({ status: 200, description: 'Registro encontrado con orden y producto' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordenProductoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar cantidad o precio de un producto en la orden', description: 'Actualiza la cantidad o precio unitario de un producto en una orden' })
  @ApiParam({ name: 'id', description: 'ID del registro orden_producto', type: Number })
  @ApiBody({ type: UpdateOrdenProductoDto })
  @ApiResponse({ status: 200, description: 'Registro actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrdenProductoDto: UpdateOrdenProductoDto) {
    return this.ordenProductoService.update(id, updateOrdenProductoDto);
  }

  @Delete(':id/productos/:productId')
  @ApiOperation({ summary: 'Quitar un producto de una orden', description: 'Elimina (soft delete) un producto específico de una orden' })
  @ApiParam({ name: 'id', description: 'ID de la orden', type: Number })
  @ApiParam({ name: 'productId', description: 'ID del producto a quitar', type: Number })
  @ApiResponse({ status: 200, description: 'Producto quitado de la orden correctamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado en la orden' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.ordenProductoService.removeProductFromOrden(id, productId);
  }
}
