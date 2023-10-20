import { Database } from '@database/index';
import { Product } from '@modules/Products/entities/Product';
import { ProductsRepository } from '@modules/Products/repositories/ProductsRepository';
import { InjectableKeys } from '@shared/container/keys';
import { inject, injectable } from 'tsyringe';
import { ProductsKnexMapper } from './ProductsKnexMapper';

@injectable()
export class ProductsKnexRepository implements ProductsRepository {
  constructor(
    @inject(InjectableKeys.Database)
    private readonly database: Database,
  ) {}

  async create(product: Product): Promise<void> {
    await this.database
      .knex('products')
      .insert(ProductsKnexMapper.toKnex(product));
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await this.database
      .knex('products')
      .where({ name })
      .first();

    if (!product) {
      return null;
    }

    return ProductsKnexMapper.toEntity(product);
  }

  async findByBarCode(barCode: number): Promise<Product | null> {
    const product = await this.database
      .knex('products')
      .where({ bar_code: barCode })
      .first();

    if (!product) {
      return null;
    }

    return ProductsKnexMapper.toEntity(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.database.knex('products');

    return products.map(ProductsKnexMapper.toEntity);
  }
}
