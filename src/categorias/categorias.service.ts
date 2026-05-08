import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriaRepo.create(createCategoriaDto);
    return await this.categoriaRepo.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepo.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepo.findOne({
      where: { idCategoria: id },
      relations: ['productos'],
    });
    if (!categoria) {
      throw new NotFoundException(`Categoría con id ${id} no encontrada`);
    }
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id);
    Object.assign(categoria, updateCategoriaDto);
    return await this.categoriaRepo.save(categoria);
  }

  async remove(id: number): Promise<{ message: string }> {
    const categoria = await this.findOne(id);
    await this.categoriaRepo.softRemove(categoria);
    return { message: `Categoría con id ${id} eliminada correctamente` };
  }
}
