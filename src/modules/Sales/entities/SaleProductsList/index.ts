import { WatchedList } from '@shared/core/entities/WatchedList';
import { SaleProduct } from '../SaleProduct';

export class SaleProductsList extends WatchedList<SaleProduct> {
  compareItems(a: SaleProduct, b: SaleProduct): boolean {
    return a.equals(b);
  }
}
