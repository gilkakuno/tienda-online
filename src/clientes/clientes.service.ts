import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepo.create(createClienteDto);
    return await this.clienteRepo.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepo.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepo.findOne({
      where: { idCliente: id },
      relations: ['ordenes'],
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    }
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    Object.assign(cliente, updateClienteDto);
    return await this.clienteRepo.save(cliente);
  }

  async remove(id: number): Promise<{ message: string }> {
    const cliente = await this.findOne(id);
    await this.clienteRepo.softRemove(cliente);
    return { message: `Cliente con id ${id} eliminado correctamente` };
  }
}
