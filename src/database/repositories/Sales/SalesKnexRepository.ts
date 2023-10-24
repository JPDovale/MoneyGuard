import { Database } from '@database/index';
import { Sale } from '@modules/Sales/entities/Sale';
import { SalesRepository } from '@modules/Sales/repositories/SalesRepository';
import { InjectableKeys } from '@shared/container/keys';
import { inject, injectable } from 'tsyringe';
import { SalesKnexMapper } from './SalesKnexMapper';
import { SalesProductsRepository } from '@modules/Sales/repositories/SalesProductsRepository';

@injectable()
export class SalesKnexRepository implements SalesRepository {
  constructor(
    @inject(InjectableKeys.Database)
    private readonly database: Database,

    @inject(InjectableKeys.SalesProductsRepository)
    private readonly salesProductsRepository: SalesProductsRepository,
  ) {}

  async create(sale: Sale): Promise<void> {
    await this.database.knex('sales').insert(SalesKnexMapper.toKnex(sale));

    if (sale.products) {
      const promises: Array<Promise<void>> = [];
      const newItems = sale.products.getNewItems();
      const removedItems = sale.products.getRemovedItems();

      newItems.forEach((newItem) =>
        promises.push(this.salesProductsRepository.create(newItem)),
      );
      removedItems.forEach((removedItem) =>
        promises.push(this.salesProductsRepository.delete(removedItem)),
      );

      await Promise.all(promises);
    }
  }
}
