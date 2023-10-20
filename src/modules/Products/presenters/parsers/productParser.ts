import { Product } from '@modules/Products/entities/Product';
import { ProductModelResponse } from '../types';

export function productParser(product: Product): ProductModelResponse {
  return {
    barCode: product.barCode,
    brand: product.brand,
    createdAt: product.createdAt,
    description: product.description,
    id: product.id.toString(),
    isHeavy: product.isHeavy,
    name: product.name,
    price: product.price,
    quantityInStock: product.quantityInStock,
    tagId: product.tagId.toString(),
    updatedAt: product.updatedAt,
  };
}
