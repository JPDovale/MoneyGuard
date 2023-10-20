import { Tag } from '../entities/Tag';

export abstract class TagsRepository {
  abstract findByName(name: string): Promise<Tag | null>;
  abstract findById(id: string): Promise<Tag | null>;
  abstract create(tag: Tag): Promise<void>;
  abstract findAll(): Promise<Tag[]>;
}
