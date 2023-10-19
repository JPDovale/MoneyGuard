import { Tag } from '@modules/Tags/entities/Tag';
import { AlreadyExistsTagWithSamaName } from '@modules/Tags/errors/AlreadyExistsTagWithSamaName';
import { TagsRepository } from '@modules/Tags/repositories/TagsRepository';
import { InjectableKeys } from '@shared/container/keys';
import { Either, left, right } from '@shared/core/error/Either';
import { inject, injectable } from 'tsyringe';

interface Request {
  name: string;
}

type Response = Either<
  AlreadyExistsTagWithSamaName,
  {
    tag: Tag;
  }
>;

@injectable()
export class CreateTagService {
  constructor(
    @inject(InjectableKeys.TagsRepository)
    private readonly tagsRepository: TagsRepository,
  ) {}

  async execute({ name }: Request): Promise<Response> {
    const tagExistes = await this.tagsRepository.findByName(name);
    if (tagExistes) {
      return left(new AlreadyExistsTagWithSamaName());
    }

    const tag = Tag.create({
      name,
    });

    await this.tagsRepository.create(tag);

    return right({
      tag,
    });
  }
}
