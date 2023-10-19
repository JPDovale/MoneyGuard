import { onUpdateTrigger } from '@database/utils/onUpdateTrigger';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tags', (table) => {
    table.string('id').unique().notNullable().defaultTo(knex.fn.uuid());
    table.string('name').unique().notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(null);
  });

  await knex.schema.raw(onUpdateTrigger('tags'));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tags');
}
