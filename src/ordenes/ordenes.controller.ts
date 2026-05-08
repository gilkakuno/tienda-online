import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrdenesService } from './ordenes.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@ApiTags('ordenes')
@Controller('ordenes')
export class OrdenesController {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva orden', description: 'Crea una nueva orden de compra asociada a un cliente existente' })
  @ApiBody({ type: CreateOrdenDto })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createOrdenDto: CreateOrdenDto) {
    return this.ordenesService.create(createOrdenDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las órdenes', description: 'Retorna el listado completo de órdenes con el cliente asociado' })
  @ApiResponse({ status: 200, description: 'Listado de órdenes' })
  findAll() {
    return this.ordenesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una orden por ID', description: 'Retorna los datos de la orden con cliente y todos sus productos' })
  @ApiParam({ name: 'id', description: 'ID de la orden', type: Number })
  @ApiResponse({ status: 200, description: 'Orden encontrada con productos' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordenesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar el estado de la orden', description: 'Actualiza el estado u otros datos de una orden existente' })
  @ApiParam({ name: 'id', description: 'ID de la orden', type: Number })
  @ApiBody({ type: UpdateOrdenDto })
  @ApiResponse({ status: 200, description: 'Orden actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrdenDto: UpdateOrdenDto) {
    return this.ordenesService.update(id, updateOrdenDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una orden', description: 'Elimina (soft delete) una orden del sistema' })
  @ApiParam({ name: 'id', description: 'ID de la orden', type: Number })
  @ApiResponse({ status: 200, description: 'Orden eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordenesService.remove(id);
  }
}
