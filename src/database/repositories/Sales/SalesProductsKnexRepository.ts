import { Database } from '@database/index';
import { SaleProduct } from '@modules/Sales/entities/SaleProduct';
import { SalesProductsRepository } from '@modules/Sales/repositories/SalesProductsRepository';
import { InjectableKeys } from '@shared/container/keys';
import { inject, injectable } from 'tsyringe';
import { SalesProductsKnexMapper } from './SalesProductsKnexMapper';

@injectable()
export class SalesProductsKnexRepository implements SalesProductsRepository {
  constructor(
    @inject(InjectableKeys.Database)
    private readonly database: Database,
  ) {}

  async create(saleProduct: SaleProduct): Promise<void> {
    await this.database
      .knex('sales_products')
      .insert(SalesProductsKnexMapper.toKnex(saleProduct));
  }

  async delete(saleProduct: SaleProduct): Promise<void> {
    await this.database
      .knex('sales_products')
      .where({ id: saleProduct.id.toString() })
      .del();
  }
}
