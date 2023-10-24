import { Database } from '@database/index';
import { Customer } from '@modules/Customers/entities/Customer';
import { CustomersRepository } from '@modules/Customers/repositories/CustomersRepository';
import { InjectableKeys } from '@shared/container/keys';
import { inject, injectable } from 'tsyringe';
import { CustomersKnexMapper } from './CustomersKnexMapper';

@injectable()
export class CustomersKnexRepository implements CustomersRepository {
  constructor(
    @inject(InjectableKeys.Database)
    private readonly database: Database,
  ) {}

  async create(customer: Customer): Promise<void> {
    await this.database
      .knex('customers')
      .insert(CustomersKnexMapper.toKnex(customer));
  }

  async findByName(name: string): Promise<Customer | null> {
    const customer = await this.database
      .knex('customers')
      .where({ name })
      .first();

    if (!customer) return null;

    return CustomersKnexMapper.toEntity(customer);
  }

  async save(customer: Customer): Promise<void> {
    await this.database
      .knex('customers')
      .where({ id: customer.id.toString() })
      .update(CustomersKnexMapper.toKnex(customer));
  }
}
