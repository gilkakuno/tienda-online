import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({ example: 1, description: 'ID de la categoría a la que pertenece el producto' })
  @IsInt()
  @IsPositive()
  idCategoria: number;

  @ApiProperty({ example: 'Laptop HP', description: 'Nombre del producto' })
  @IsString()
  @MinLength(2)
  nombre: string;

  @ApiPropertyOptional({ example: 'Laptop HP 15 pulgadas, 8GB RAM', description: 'Descripción del producto' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ example: 1500.00, description: 'Precio del producto' })
  @IsNumber()
  @IsPositive()
  precio: number;

  @ApiProperty({ example: 10, description: 'Cantidad disponible en stock' })
  @IsInt()
  @Min(0)
  stock: number;
}
