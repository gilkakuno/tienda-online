import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateOrdenProductoDto {
  @ApiProperty({ example: 1, description: 'ID de la orden' })
  @IsInt()
  @IsPositive()
  idOrden: number;

  @ApiProperty({ example: 1, description: 'ID del producto a agregar' })
  @IsInt()
  @IsPositive()
  idProducto: number;

  @ApiProperty({ example: 2, description: 'Cantidad del producto en la orden' })
  @IsInt()
  @IsPositive()
  cantidad: number;

  @ApiProperty({ example: 1500.00, description: 'Precio unitario del producto al momento de la orden' })
  @IsNumber()
  @IsPositive()
  precio_unitario: number;
}
