import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('products', (table) => {
    table.string('bar_code').unique().notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.alterTable('products', (table) => {
    table.dropColumn('bar_code');
  });
}
