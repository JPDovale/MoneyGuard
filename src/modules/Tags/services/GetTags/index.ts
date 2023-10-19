import { Tag } from '@modules/Tags/entities/Tag';
import { TagsRepository } from '@modules/Tags/repositories/TagsRepository';
import { InjectableKeys } from '@shared/container/keys';
import { Either, right } from '@shared/core/error/Either';
import { inject, injectable } from 'tsyringe';

type Response = Either<
  null,
  {
    tags: Tag[];
  }
>;
@injectable()
export class GetTagsService {
  constructor(
    @inject(InjectableKeys.TagsRepository)
    private readonly tagsRepository: TagsRepository,
  ) {}

  async execute(): Promise<Response> {
    const tags = await this.tagsRepository.findAll();
    return right({
      tags,
    });
  }
}
