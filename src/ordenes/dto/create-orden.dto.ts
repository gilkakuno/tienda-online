import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateOrdenDto {
  @ApiProperty({ example: 1, description: 'ID del cliente que realiza la orden' })
  @IsInt()
  @IsPositive()
  idCliente: number;

  @ApiPropertyOptional({ example: 'pendiente', description: 'Estado de la orden: pendiente, procesando, enviado, entregado, cancelado' })
  @IsOptional()
  @IsString()
  @IsIn(['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'])
  estado?: string;
}
