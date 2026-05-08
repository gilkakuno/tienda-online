import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ example: 'Juan Carlos', description: 'Nombres del cliente' })
  @IsString()
  @MinLength(2)
  nombres: string;

  @ApiProperty({ example: 'Mamani', description: 'Apellido paterno' })
  @IsString()
  @MinLength(2)
  paterno: string;

  @ApiPropertyOptional({ example: 'Quispe', description: 'Apellido materno' })
  @IsOptional()
  @IsString()
  materno?: string;

  @ApiProperty({ example: 'juan@email.com', description: 'Correo electrónico único del cliente' })
  @IsEmail()
  email: string;
}
