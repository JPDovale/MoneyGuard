import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { UniqueEntityId } from '@shared/core/entities/UniqueEntityId';
import { Optional } from '@shared/core/types/Optional';

export interface TagProps {
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export class Tag extends AggregateRoot<TagProps> {
  static create(
    props: Optional<TagProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityId,
  ) {
    return new Tag(
      {
        name: props.name.toUpperCase().trim().replaceAll(' ', '_'),
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    );
  }

  get name() {
    return this.props.name;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
