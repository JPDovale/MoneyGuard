import { Sale } from '@modules/Sales/entities/Sale';
import { SaleFile } from './types';
import { UniqueEntityId } from '@shared/core/entities/UniqueEntityId';

export class SalesKnexMapper {
  static toEntity(raw: SaleFile): Sale {
    return Sale.create(
      {
        customerId: new UniqueEntityId(raw.customer_id),
        paymentType: raw.payment_type,
        paymentValue: raw.payment_value,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toKnex(sale: Sale): SaleFile {
    return {
      created_at: sale.createdAt,
      customer_id: sale.customerId.toString(),
      id: sale.id.toString(),
      payment_type: sale.paymentType,
      payment_value: sale.paymentValue,
      updated_at: sale.updatedAt,
    };
  }
}
