import path from 'node:path';
import type { Knex } from 'knex';
import { getDatabasePath } from './src/config/files/getDatabasePath';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: `${getDatabasePath()}/db.sqlite3`,
      database: 'money_guard',
    },
    useNullAsDefault: true,
    migrations: {
      directory: `${path.join(__dirname, 'src', 'database', 'migrations')}`,
    },
  },
};

module.exports = config;
