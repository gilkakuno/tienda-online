import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { OrdenProducto } from '../../orden-producto/entities/orden-producto.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  idProducto: number;

  @Column()
  idCategoria: number;

  @Column({ length: 150 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'idCategoria' })
  categoria: Categoria;

  @OneToMany(() => OrdenProducto, (op) => op.producto)
  ordenProductos: OrdenProducto[];
}
