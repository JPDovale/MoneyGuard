import { Customer } from '@modules/Customers/entities/Customer';
import { CustomerFile } from './types';
import { UniqueEntityId } from '@shared/core/entities/UniqueEntityId';

export class CustomersKnexMapper {
  static toEntity(raw: CustomerFile): Customer {
    return Customer.create(
      {
        name: raw.name,
        createdAt: raw.created_at,
        owing: raw.owing,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toKnex(customer: Customer): CustomerFile {
    return {
      created_at: customer.createdAt,
      id: customer.id.toString(),
      name: customer.name,
      owing: customer.owing,
      updated_at: customer.updatedAt,
    };
  }
}
