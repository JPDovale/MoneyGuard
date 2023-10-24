import { SaleProduct } from '../entities/SaleProduct';

export abstract class SalesProductsRepository {
  abstract create(saleProduct: SaleProduct): Promise<void>;
  abstract delete(saleProduct: SaleProduct): Promise<void>;
}
