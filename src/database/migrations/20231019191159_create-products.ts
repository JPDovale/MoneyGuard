import { onUpdateTrigger } from '@database/utils/onUpdateTrigger';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('products', (table) => {
    table.string('id').unique().notNullable().defaultTo(knex.fn.uuid());
    table.string('name').unique().notNullable();
    table.string('brand').notNullable();
    table.string('description').defaultTo(null);
    table.integer('quantity_in_stock').notNullable().defaultTo(1);
    table.integer('price').notNullable();
    table.boolean('is_heavy').notNullable().defaultTo('false');

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(null);

    table.string('tag_id').references('tags.id').onDelete('SET NULL');
  });

  await knex.schema.raw(onUpdateTrigger('products'));
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('products');
}
