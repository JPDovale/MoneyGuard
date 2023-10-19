import { Tag } from '@modules/Tags/entities/Tag';
import { TagFile } from './types';
import { UniqueEntityId } from '@shared/core/entities/UniqueEntityId';

export class TagsKnexMapper {
  static toEntity(raw: TagFile): Tag {
    return Tag.create(
      {
        name: raw.name,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toKnex(tag: Tag): TagFile {
    return {
      id: tag.id.toString(),
      name: tag.name,
    };
  }
}
