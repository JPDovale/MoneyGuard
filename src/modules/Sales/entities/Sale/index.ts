import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { UniqueEntityId } from '@shared/core/entities/UniqueEntityId';
import { SaleProductsList } from '../SaleProductsList';
import { Optional } from '@shared/core/types/Optional';

type PaymentType = 'MONEY' | 'CARD' | 'NOT-PAYED';

interface SaleProps {
  customerId: UniqueEntityId;
  products: SaleProductsList;
  paymentType: PaymentType;
  paymentValue: number;

  createdAt: Date;
  updatedAt: Date | null;
}

export class Sale extends AggregateRoot<SaleProps> {
  static create(
    props: Optional<SaleProps, 'createdAt' | 'updatedAt' | 'products'>,
    id?: UniqueEntityId,
  ) {
    return new Sale(
      {
        ...props,
        products: props.products ?? new SaleProductsList(),
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    );
  }

  get customerId() {
    return this.props.customerId;
  }

  get products() {
    return this.props.products;
  }

  get paymentType() {
    return this.props.paymentType;
  }

  get paymentValue() {
    return this.props.paymentValue;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
