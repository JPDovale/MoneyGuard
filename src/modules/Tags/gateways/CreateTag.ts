import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTagGateway {
  @IsString()
  @MinLength(2, { message: 'O nome da tag precisa ter ao menos 2 caracteres' })
  @MaxLength(90, {
    message: 'O nome da tag não pode ter mais de 90 caracteres',
  })
  name: string;

  constructor(data: CreateTagGateway) {
    this.name = data.name.trim();
  }
}
