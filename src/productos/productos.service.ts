import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const categoria = await this.categoriaRepo.findOneBy({ idCategoria: createProductoDto.idCategoria });
    if (!categoria) {
      throw new NotFoundException(`Categoría con id ${createProductoDto.idCategoria} no encontrada`);
    }
    const producto = this.productoRepo.create(createProductoDto);
    return await this.productoRepo.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return await this.productoRepo.find({ relations: ['categoria'] });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepo.findOne({
      where: { idProducto: id },
      relations: ['categoria'],
    });
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);
    if (updateProductoDto.idCategoria) {
      const categoria = await this.categoriaRepo.findOneBy({ idCategoria: updateProductoDto.idCategoria });
      if (!categoria) {
        throw new NotFoundException(`Categoría con id ${updateProductoDto.idCategoria} no encontrada`);
      }
    }
    Object.assign(producto, updateProductoDto);
    return await this.productoRepo.save(producto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const producto = await this.findOne(id);
    await this.productoRepo.softRemove(producto);
    return { message: `Producto con id ${id} eliminado correctamente` };
  }
}
