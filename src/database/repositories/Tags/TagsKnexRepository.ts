import { Tag } from '@modules/Tags/entities/Tag';
import { TagsRepository } from '@modules/Tags/repositories/TagsRepository';
import { TagsKnexMapper } from './TagsKnexMapper';
import { Database } from '@database/index';
import { inject, injectable } from 'tsyringe';
import { InjectableKeys } from '@shared/container/keys';

@injectable()
export class TagsKnexRepository implements TagsRepository {
  constructor(
    @inject(InjectableKeys.Database)
    private readonly database: Database,
  ) {}

  async findById(id: string): Promise<Tag | null> {
    const tag = await this.database.knex('tags').where({ id }).first();

    if (!tag) {
      return null;
    }

    return TagsKnexMapper.toEntity(tag);
  }

  async findByName(name: string): Promise<Tag | null> {
    const tag = await this.database
      .knex('tags')
      .where({ name: name.toUpperCase().trim().replaceAll(' ', '_') })
      .first();

    if (!tag) {
      return null;
    }

    return TagsKnexMapper.toEntity(tag);
  }

  async create(tag: Tag): Promise<void> {
    await this.database.knex('tags').insert(TagsKnexMapper.toKnex(tag));
  }

  async findAll(): Promise<Tag[]> {
    const tags = await this.database.knex('tags');

    return tags.map(TagsKnexMapper.toEntity);
  }
}
