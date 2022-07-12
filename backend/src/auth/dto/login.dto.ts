import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
  @IsString({ message: "Nome contém caracteres inválidos." })
  @IsNotEmpty({ message: "Nome é obrigatório." })
  @MinLength(4, { message: "Nome deve ter no mínimo 4 caracteres." })
  @MaxLength(20, { message: "Nome deve ter no máximo 20 caracteres." })
  name: string;

  @IsString({ message: "Senha contém caracteres inválidos." })
  @IsNotEmpty({ message: "Senha é obrigatória." })
  @MinLength(4, { message: "Senha deve ter no mínimo 4 caracteres." })
  @MaxLength(20, { message: "Senha deve ter no máximo 20 caracteres." })
  password: string;
}
