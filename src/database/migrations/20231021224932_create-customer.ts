import { onUpdateTrigger } from '@database/utils/onUpdateTrigger';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('customers', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid());
    table.string('name').unique().notNullable();
    table.integer('owing').nullable().defaultTo(null);

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(null);
  });

  await knex.schema.raw(onUpdateTrigger('customers'));
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('customers');
}
