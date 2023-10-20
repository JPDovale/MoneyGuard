import { Tag } from '@modules/Tags/entities/Tag';
import { TagFile } from './types';
import { UniqueEntityId } from '@shared/core/entities/UniqueEntityId';
import { Optional } from '@shared/core/types/Optional';

export class TagsKnexMapper {
  static toEntity(raw: TagFile): Tag {
    return Tag.create(
      {
        name: raw.name,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toKnex(tag: Tag): Optional<TagFile, 'created_at' | 'updated_at'> {
    return {
      id: tag.id.toString(),
      name: tag.name,
    };
  }
}
