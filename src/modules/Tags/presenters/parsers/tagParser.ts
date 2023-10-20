import { Tag } from '@modules/Tags/entities/Tag';
import { TagModelResponse } from '../types';

export function tagParser(tag: Tag): TagModelResponse {
  return {
    id: tag.id.toString(),
    name: tag.name,
    createdAt: tag.createdAt,
    updatedAt: tag.updatedAt,
  };
}
