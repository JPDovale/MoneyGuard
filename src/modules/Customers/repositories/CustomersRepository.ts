import { Customer } from '../entities/Customer';

export abstract class CustomersRepository {
  abstract create(customer: Customer): Promise<void>;
  abstract save(customer: Customer): Promise<void>;
  abstract findByName(name: string): Promise<Customer | null>;
}
