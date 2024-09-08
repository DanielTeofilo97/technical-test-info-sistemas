import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Length, IsNotEmpty, Matches, IsOptional, Min, Max } from 'class-validator';

export class CreateVehicleDTO {
  @ApiProperty({
    description: 'Placa do veículo',
    example: 'ABC1D23',
  })
  @IsString({ message: 'A plate "placa" deve ser uma cadeia de caracteres' })
  @IsNotEmpty({ message: 'A plate "placa" não pode estar vazia' })
  @Matches(/^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/, { message: 'A plate "placa" deve seguir o padrão: AAA0X00' })
  plate: string;

  @ApiProperty({
    description: 'Número do chassi',
    example: '9B32H45A678901234',
  })
  @IsString({ message: 'O chassis deve ser uma cadeia de caracteres' })
  @IsNotEmpty({ message: 'O chassis não pode estar vazio' })
  @Length(17, 17, { message: 'O chassis deve ter exatamente 17 caracteres' })
  chassis: string;

  @ApiProperty({
    description: 'Número do Renavam',
    example: '12345678900',
  })
  @IsString({ message: 'O renavam deve ser uma cadeia de caracteres' })
  @IsNotEmpty({ message: 'O renavam não pode estar vazio' })
  @Length(11, 11, { message: 'O renavam deve ter exatamente 11 caracteres' })
  renavam: string;

  @ApiProperty({
    description: 'Modelo do veículo',
    example: 'Fusca 1.0',
  })
  @IsString({ message: 'O model "modelo" deve ser uma cadeia de caracteres' })
  @IsNotEmpty({ message: 'O model "modelo" não pode estar vazio' })
  @Length(1, 100, { message: 'O model "modelo" deve ter entre 1 e 100 caracteres' })
  model: string;

  @ApiProperty({
    description: 'Marca do veículo',
    example: 'Volkswagen',
  })
  @IsString({ message: 'A brand "marca" deve ser uma cadeia de caracteres' })
  @IsNotEmpty({ message: 'A brand "marca" não pode estar vazia' })
  @Length(1, 100, { message: 'A brand "marca" deve ter entre 1 e 100 caracteres' })
  brand: string;

  @ApiProperty({
    description: 'Ano do veículo',
    example: 2020,
  })
  @IsInt({ message: 'O year "ano" deve ser um número inteiro' })
  @IsNotEmpty({ message: 'O year "ano" não pode estar vazio' })
  @Min(1900, { message: 'O ano não pode ser anterior a 1900' })
  @Max(new Date().getFullYear(), { message: `O ano não pode ser posterior a ${new Date().getFullYear()}` })
  year: number;

  @ApiProperty({
    description: 'ID do usuário que criou o veículo',
    example: 'a5e5c70e-9e56-4a4e-b418-6d6f663a4589',
    required: false,
  })
  @IsString({ message: 'O ID do usuário criador deve ser uma cadeia de caracteres' })
  @IsOptional()
  idUserCreate?: string;

  @ApiProperty({
    description: 'ID do usuário que atualizou o veículo',
    example: 'd60e77ab-4a6d-4e7c-b1e1-9f2d907d2f8d',
    required: false,
  })
  @IsString({ message: 'O ID do usuário atualizador deve ser uma cadeia de caracteres' })
  @IsOptional()
  idUserUpdate?: string;
}
