// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex';

import { TagFile } from '@database/repositories/Tags/types';
import { ProductFile } from '@database/repositories/products/types';

declare module 'knex/types/tables' {
  interface Tables {
    tags: TagFile;
    products: ProductFile;
  }
}
