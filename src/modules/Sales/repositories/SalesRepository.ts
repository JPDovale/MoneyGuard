import { Sale } from '../entities/Sale';

export abstract class SalesRepository {
  abstract create(sale: Sale): Promise<void>;
}
