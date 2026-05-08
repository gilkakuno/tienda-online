import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Electrónica', description: 'Nombre de la categoría' })
  @IsString()
  @MinLength(2)
  nombre: string;

  @ApiPropertyOptional({ example: 'Productos electrónicos y tecnología', description: 'Descripción de la categoría' })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
