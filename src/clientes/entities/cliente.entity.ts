import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Orden } from '../../ordenes/entities/orden.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  paterno: string;

  @Column({ length: 100, nullable: true })
  materno: string;



  @Column({ length: 150, unique: true })
  email: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @OneToMany(() => Orden, (orden) => orden.cliente)
  ordenes: Orden[];
}
