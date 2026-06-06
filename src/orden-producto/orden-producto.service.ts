import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdenProducto } from './entities/orden-producto.entity';
import { Orden } from '../ordenes/entities/orden.entity';
import { Producto } from '../productos/entities/producto.entity';
import { CreateOrdenProductoDto } from './dto/create-orden-producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden-producto.dto';

@Injectable()
export class OrdenProductoService {
  constructor(
    @InjectRepository(OrdenProducto)
    private readonly ordenProductoRepo: Repository<OrdenProducto>,
    @InjectRepository(Orden)
    private readonly ordenRepo: Repository<Orden>,
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
  ) { }

  async create(createOrdenProductoDto: CreateOrdenProductoDto): Promise<OrdenProducto> {
    const orden = await this.ordenRepo.findOneBy({ idOrden: createOrdenProductoDto.idOrden });
    if (!orden) {
      throw new NotFoundException(`Orden con id ${createOrdenProductoDto.idOrden} no encontrada`);
    }

    const producto = await this.productoRepo.findOneBy({ idProducto: createOrdenProductoDto.idProducto });
    if (!producto) {
      throw new NotFoundException(`Producto con id ${createOrdenProductoDto.idProducto} no encontrado`);
    }

    const ordenProducto = this.ordenProductoRepo.create(createOrdenProductoDto);
    const saved = await this.ordenProductoRepo.save(ordenProducto);

    const items = await this.ordenProductoRepo.find({ where: { idOrden: orden.idOrden } });
    const nuevoTotal = items.reduce((acc, item) => acc + Number(item.precio_unitario) * item.cantidad, 0);
    await this.ordenRepo.update(orden.idOrden, { total: nuevoTotal });

    return saved;
  }

  async findAll(): Promise<OrdenProducto[]> {
    return await this.ordenProductoRepo.find({ relations: ['orden', 'producto'] });
  }

  async findOne(id: number): Promise<OrdenProducto> {
    const op = await this.ordenProductoRepo.findOne({
      where: { idOrdenProducto: id },
      relations: ['orden', 'producto'],
    });
    if (!op) {
      throw new NotFoundException(`OrdenProducto con id ${id} no encontrada`);
    }
    return op;
  }

  async update(id: number, updateOrdenProductoDto: UpdateOrdenProductoDto): Promise<OrdenProducto> {
    const op = await this.findOne(id);
    Object.assign(op, updateOrdenProductoDto);
    const saved = await this.ordenProductoRepo.save(op);

    const items = await this.ordenProductoRepo.find({ where: { idOrden: op.idOrden } });
    const nuevoTotal = items.reduce((acc, item) => acc + Number(item.precio_unitario) * item.cantidad, 0);
    await this.ordenRepo.update(op.idOrden, { total: nuevoTotal });

    return saved;
  }

  async removeProductFromOrden(ordenId: number, productoId: number): Promise<{ message: string }> {
    const op = await this.ordenProductoRepo.findOne({
      where: { idOrden: ordenId, idProducto: productoId },
    });
    if (!op) {
      throw new NotFoundException(`No se encontró el producto ${productoId} en la orden ${ordenId}`);
    }
    await this.ordenProductoRepo.softRemove(op);

    const items = await this.ordenProductoRepo.find({ where: { idOrden: ordenId } });
    const nuevoTotal = items.reduce((acc, item) => acc + Number(item.precio_unitario) * item.cantidad, 0);
    await this.ordenRepo.update(ordenId, { total: nuevoTotal });

    return { message: `Producto ${productoId} quitado de la orden ${ordenId}` };
  }
}
