import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { UniqueEntityId } from '@shared/core/entities/UniqueEntityId';

export interface TagProps {
  name: string;
}

export class Tag extends AggregateRoot<TagProps> {
  static create(props: TagProps, id?: UniqueEntityId) {
    return new Tag(
      { name: props.name.toUpperCase().trim().replaceAll(' ', '_') },
      id,
    );
  }

  get name() {
    return this.props.name;
  }
}
