import { onUpdateTrigger } from '@database/utils/onUpdateTrigger';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('sales_products', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid());
    table.integer('quantity').notNullable();
    table.integer('total').notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(null);

    table.string('product_id').references('products.id').onDelete('SET NULL');
    table.string('sale_id').references('sales.id').onDelete('CASCADE');
  });

  await knex.schema.raw(onUpdateTrigger('sales_products'));
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('sales_products');
}
