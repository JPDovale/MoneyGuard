import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { UniqueEntityId } from '@shared/core/entities/UniqueEntityId';
import { Optional } from '@shared/core/types/Optional';

interface SaleProductProps {
  saleId: UniqueEntityId;
  productId: UniqueEntityId;
  quantity: number;
  total: number;

  createdAt: Date;
  updatedAt: Date | null;
}

export class SaleProduct extends AggregateRoot<SaleProductProps> {
  static create(
    props: Optional<SaleProductProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityId,
  ) {
    return new SaleProduct(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    );
  }

  get saleId() {
    return this.props.saleId;
  }

  get productId() {
    return this.props.productId;
  }

  get quantity() {
    return this.props.quantity;
  }

  get total() {
    return this.props.total;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
