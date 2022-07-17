import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRecipeDto {

  @IsString({ message: "Nome contém caracteres inválidos." })
  @IsNotEmpty({ message: "Nome é obrigatório." })
  @MinLength(4, { message: "Nome deve ter no mínimo 4 caracteres." })
  @MaxLength(64, { message: "Nome deve ter no máximo 64 caracteres." })
  name: string;

  @IsString({ message: "Descrição contém caracteres inválidos." })
  @IsNotEmpty({ message: "Descrição é obrigatório." })
  @MinLength(20, { message: "Descrição deve ter no mínimo 20 caracteres." })
  @MaxLength(255, { message: "Descrição deve ter no máximo 255 caracteres." })
  description: string;


  @IsNotEmpty({ message: "Descrição é obrigatório." })
  @IsString({ each: true, message: "Ingredientes contém caracteres inválidos." })
  ingredients: string;

  @IsString({ message: "Instruções contém caracteres inválidos." })
  @IsNotEmpty({ message: "Instruções é obrigatório." })
  @MinLength(20, { message: "Instruções deve ter no mínimo 20 caracteres." })
  @MaxLength(255, { message: "Instruções deve ter no máximo 255 caracteres." })
  instructions: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty({ message: "Categoria é obrigatório." })
  @IsPositive({ message: "Categoria deve ser um número positivo." })
  category: number;

  @IsNotEmpty({ message: "Tags é obrigatório." })
  @IsString({ each: true, message: "Ingredientes contém caracteres inválidos." })
  tags: string;
}
