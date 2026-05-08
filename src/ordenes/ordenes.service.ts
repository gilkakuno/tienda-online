import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orden } from './entities/orden.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Orden)
    private readonly ordenRepo: Repository<Orden>,
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  async create(createOrdenDto: CreateOrdenDto): Promise<Orden> {
    const cliente = await this.clienteRepo.findOneBy({ idCliente: createOrdenDto.idCliente });
    if (!cliente) {
      throw new NotFoundException(`Cliente con id ${createOrdenDto.idCliente} no encontrado`);
    }
    const orden = this.ordenRepo.create({
      ...createOrdenDto,
      estado: createOrdenDto.estado || 'pendiente',
      total: 0,
    });
    return await this.ordenRepo.save(orden);
  }

  async findAll(): Promise<Orden[]> {
    return await this.ordenRepo.find({ relations: ['cliente'] });
  }

  async findOne(id: number): Promise<Orden> {
    const orden = await this.ordenRepo.findOne({
      where: { idOrden: id },
      relations: ['cliente', 'ordenProductos', 'ordenProductos.producto'],
    });
    if (!orden) {
      throw new NotFoundException(`Orden con id ${id} no encontrada`);
    }
    return orden;
  }

  async update(id: number, updateOrdenDto: UpdateOrdenDto): Promise<Orden> {
    const orden = await this.findOne(id);
    Object.assign(orden, updateOrdenDto);
    return await this.ordenRepo.save(orden);
  }

  async remove(id: number): Promise<{ message: string }> {
    const orden = await this.findOne(id);
    await this.ordenRepo.softRemove(orden);
    return { message: `Orden con id ${id} eliminada correctamente` };
  }
}
