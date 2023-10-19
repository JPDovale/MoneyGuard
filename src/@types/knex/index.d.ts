// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex';

import { TagFile } from '@database/repositories/Tags/types';

declare module 'knex/types/tables' {
  interface Tables {
    tags: TagFile;
  }
}
