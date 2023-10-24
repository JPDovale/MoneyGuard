import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { UniqueEntityId } from '@shared/core/entities/UniqueEntityId';
import { Optional } from '@shared/core/types/Optional';

export interface CustomerProps {
  name: string;
  owing: number | null;

  createdAt: Date;
  updatedAt: Date | null;
}

export class Customer extends AggregateRoot<CustomerProps> {
  static create(
    props: Optional<CustomerProps, 'createdAt' | 'updatedAt' | 'owing'>,
    id?: UniqueEntityId,
  ) {
    return new Customer(
      {
        ...props,
        name: props.name.trim().toLowerCase().replaceAll(' ', '-'),
        owing: props.owing ?? null,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    );
  }

  get name() {
    return this.props.name;
  }

  get owing() {
    return this.props.owing;
  }

  set owing(owing: number | null) {
    this.props.owing = owing;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
