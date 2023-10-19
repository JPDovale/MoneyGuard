import { getDatabasePath } from '@config/files/getDatabasePath';

import { knex } from 'knex';
import path from 'node:path';
import { injectable } from 'tsyringe';

@injectable()
export class Database {
  private readonly _knex;

  constructor() {
    this._knex = knex({
      client: 'sqlite3',
      connection: {
        filename: `${getDatabasePath()}/db.sqlite3`,
        database: 'money_guard',
      },
      useNullAsDefault: true,
      migrations: {
        directory: `${path.join(__dirname, 'migrations')}`,
      },
    });
  }

  get knex() {
    return this._knex;
  }
}
