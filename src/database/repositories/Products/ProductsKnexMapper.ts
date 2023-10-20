import { Product } from '@modules/Products/entities/Product';
import { ProductFile } from './types';
import { UniqueEntityId } from '@shared/core/entities/UniqueEntityId';

export class ProductsKnexMapper {
  static toEntity(raw: ProductFile): Product {
    return Product.create(
      {
        brand: raw.brand,
        isHeavy: raw.is_heavy,
        name: raw.name,
        price: raw.price,
        quantityInStock: raw.quantity_in_stock,
        tagId: new UniqueEntityId(raw.tag_id),
        barCode: raw.bar_code,
        createdAt: raw.created_at,
        description: raw.description,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toKnex(product: Product): ProductFile {
    return {
      id: product.id.toString(),
      bar_code: product.barCode,
      brand: product.brand,
      description: product.description,
      created_at: product.createdAt,
      is_heavy: product.isHeavy,
      name: product.name,
      price: product.price,
      quantity_in_stock: product.quantityInStock,
      tag_id: product.tagId.toString(),
      updated_at: product.updatedAt,
    };
  }
}
