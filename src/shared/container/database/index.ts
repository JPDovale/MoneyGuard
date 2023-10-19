import { container } from 'tsyringe';
import { InjectableKeys } from '../keys';
import { TagsKnexRepository } from '@database/repositories/Tags/TagsKnexRepository';

container.registerSingleton(InjectableKeys.TagsRepository, TagsKnexRepository);
