import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Orden } from '../../ordenes/entities/orden.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('orden_producto')
export class OrdenProducto {
  @PrimaryGeneratedColumn()
  idOrdenProducto: number;

  @Column()
  idOrden: number;

  @Column()
  idProducto: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario: number;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToOne(() => Orden, (orden) => orden.ordenProductos)
  @JoinColumn({ name: 'idOrden' })
  orden: Orden;

  @ManyToOne(() => Producto, (producto) => producto.ordenProductos)
  @JoinColumn({ name: 'idProducto' })
  producto: Producto;
}
