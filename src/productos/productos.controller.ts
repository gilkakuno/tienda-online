import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto', description: 'Registra un nuevo producto asociado a una categoría existente' })
  @ApiBody({ type: CreateProductoDto })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los productos', description: 'Retorna el listado completo de productos con su categoría' })
  @ApiResponse({ status: 200, description: 'Listado de productos con categoría' })
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID', description: 'Retorna los datos del producto incluyendo su categoría' })
  @ApiParam({ name: 'id', description: 'ID del producto', type: Number })
  @ApiResponse({ status: 200, description: 'Producto encontrado con su categoría' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto', description: 'Actualiza parcialmente los datos de un producto' })
  @ApiParam({ name: 'id', description: 'ID del producto', type: Number })
  @ApiBody({ type: UpdateProductoDto })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto o categoría no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto', description: 'Elimina (soft delete) un producto del sistema' })
  @ApiParam({ name: 'id', description: 'ID del producto', type: Number })
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }
}
