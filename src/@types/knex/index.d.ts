// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex';

import { TagFile } from '@database/repositories/Tags/types';
import { ProductFile } from '@database/repositories/Products/types';
import { CustomerFile } from '@database/repositories/Customers/types';
import { SaleFile, SaleProductFile } from '@database/repositories/Sales/types';

declare module 'knex/types/tables' {
  interface Tables {
    tags: TagFile;
    products: ProductFile;
    customers: CustomerFile;
    sales: SaleFile;
    sales_products: SaleProductFile;
  }
}
