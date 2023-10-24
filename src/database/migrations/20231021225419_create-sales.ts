import { onUpdateTrigger } from '@database/utils/onUpdateTrigger';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('sales', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid());
    table.enum('payment_type', ['MONEY', 'CARD', 'NOT-PAYED']).notNullable();
    table.integer('payment_value').notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(null);

    table.string('customer_id').references('customers.id').onDelete('CASCADE');
  });

  await knex.schema.raw(onUpdateTrigger('sales'));
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('sales');
}
