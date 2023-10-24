import { SaleProduct } from '@modules/Sales/entities/SaleProduct';
import { SaleProductFile } from './types';
import { UniqueEntityId } from '@shared/core/entities/UniqueEntityId';

export class SalesProductsKnexMapper {
  static toEntity(raw: SaleProductFile): SaleProduct {
    return SaleProduct.create(
      {
        productId: new UniqueEntityId(raw.product_id),
        quantity: raw.quantity,
        saleId: new UniqueEntityId(raw.sale_id),
        total: raw.total,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toKnex(saleProduct: SaleProduct): SaleProductFile {
    return {
      created_at: saleProduct.createdAt,
      id: saleProduct.id.toString(),
      product_id: saleProduct.productId.toString(),
      quantity: saleProduct.quantity,
      sale_id: saleProduct.saleId.toString(),
      total: saleProduct.total,
      updated_at: saleProduct.updatedAt,
    };
  }
}
