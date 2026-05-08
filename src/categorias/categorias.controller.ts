import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría', description: 'Registra una nueva categoría de productos' })
  @ApiBody({ type: CreateCategoriaDto })
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las categorías', description: 'Retorna el listado completo de categorías' })
  @ApiResponse({ status: 200, description: 'Listado de categorías' })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID', description: 'Retorna los datos de la categoría incluyendo sus productos' })
  @ApiParam({ name: 'id', description: 'ID de la categoría', type: Number })
  @ApiResponse({ status: 200, description: 'Categoría encontrada con sus productos' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría', description: 'Actualiza parcialmente los datos de una categoría' })
  @ApiParam({ name: 'id', description: 'ID de la categoría', type: Number })
  @ApiBody({ type: UpdateCategoriaDto })
  @ApiResponse({ status: 200, description: 'Categoría actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría', description: 'Elimina (soft delete) una categoría del sistema' })
  @ApiParam({ name: 'id', description: 'ID de la categoría', type: Number })
  @ApiResponse({ status: 200, description: 'Categoría eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.remove(id);
  }
}
