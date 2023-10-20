import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductGateway {
  @IsString()
  @MinLength(2, {
    message: 'O nome da produto precisa ter ao menos 2 caracteres',
  })
  @MaxLength(90, {
    message: 'O nome da produto não pode ter mais de 90 caracteres',
  })
  name: string;

  @IsNumber()
  @IsOptional()
  barCode?: number;

  @IsNumber()
  @Min(1, {
    message: 'O preço precisa ser maior que zero',
  })
  price: number;

  @IsString()
  @MinLength(2, {
    message: 'A marca do produto precisa ter ao menos 2 caracteres',
  })
  @MaxLength(90, {
    message: 'A marca do produto não pode ter mais de 90 caracteres',
  })
  brand: string;

  @IsString()
  @IsOptional()
  @MaxLength(320, {
    message: 'A descrição do produto não pode ter mais de 320 caracteres',
  })
  description?: string;

  @IsUUID('all', { message: 'Referência para tag inválida' })
  tagId: string;

  @IsNumber()
  @Min(1, {
    message: 'A quantidade precisa ser maior que zero',
  })
  quantityInStock: number;

  @IsBoolean()
  isHeavy: boolean;

  constructor(data: CreateProductGateway) {
    this.name = data.name.trim().replaceAll('  ', ' ');
    this.barCode = data.barCode ? Number(data.barCode) : undefined;
    this.brand = data.brand.trim().replace('  ', ' ');
    this.description = data.description
      ? data.description.trim().replaceAll('  ', ' ')
      : undefined;
    this.isHeavy = data.isHeavy;
    this.quantityInStock = Number(data.quantityInStock);
    this.tagId = data.tagId.trim();
    this.price = Number(data.price * 1000);
  }
}
