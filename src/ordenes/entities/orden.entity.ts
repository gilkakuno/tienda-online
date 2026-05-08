import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { OrdenProducto } from '../../orden-producto/entities/orden-producto.entity';

@Entity('ordenes')
export class Orden {
  @PrimaryGeneratedColumn()
  idOrden: number;

  @Column()
  idCliente: number;

  @Column({ length: 50, default: 'pendiente' })
  estado: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.ordenes)
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;

  @OneToMany(() => OrdenProducto, (op) => op.orden)
  ordenProductos: OrdenProducto[];
}
