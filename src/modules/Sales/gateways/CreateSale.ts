import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateSaleGateway {
  @IsString()
  @MinLength(2, { message: 'O nome da tag precisa ter ao menos 2 caracteres' })
  @MaxLength(90, {
    message: 'O nome da tag não pode ter mais de 90 caracteres',
  })
  customerName: string;

  @IsNumber()
  @IsOptional()
  paymentValue?: number;

  @IsEnum(['MONEY', 'CARD', 'NOT-PAYED'])
  paymentType: 'MONEY' | 'CARD' | 'NOT-PAYED';

  @IsArray()
  products: { id: string; quantity: number }[];

  constructor(data: CreateSaleGateway) {
    this.customerName = data.customerName.trim();
    this.paymentValue = data.paymentValue;
    this.paymentType = data.paymentType;
    this.products = data.products;
  }
}
