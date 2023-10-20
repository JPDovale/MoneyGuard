import { Product } from '../entities/Product';

export abstract class ProductsRepository {
  abstract create(product: Product): Promise<void>;
  abstract findByName(name: string): Promise<Product | null>;
  abstract findAll(): Promise<Product[]>;
  abstract findByBarCode(barCode: number): Promise<Product | null>;
}
