import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { UniqueEntityId } from '@shared/core/entities/UniqueEntityId';
import { Optional } from '@shared/core/types/Optional';

export interface ProductProps {
  name: string;
  barCode: number;
  brand: string;
  tagId: UniqueEntityId;
  quantityInStock: number;
  price: number;
  description: string | null;
  isHeavy: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

export class Product extends AggregateRoot<ProductProps> {
  static create(
    props: Optional<
      ProductProps,
      'description' | 'createdAt' | 'updatedAt' | 'barCode'
    >,
    id?: UniqueEntityId,
  ) {
    return new Product(
      {
        ...props,
        barCode: props.barCode ?? Math.floor(Math.random() * 1000001),
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
        description: props.description ?? null,
      },
      id,
    );
  }

  get name() {
    return this.props.name;
  }

  get barCode() {
    return this.props.barCode;
  }

  get brand() {
    return this.props.brand;
  }

  get tagId() {
    return this.props.tagId;
  }

  get quantityInStock() {
    return this.props.quantityInStock;
  }

  get price() {
    return this.props.price;
  }

  get description() {
    return this.props.description;
  }

  get isHeavy() {
    return this.props.isHeavy;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
