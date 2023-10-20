import { container } from 'tsyringe';
import { InjectableKeys } from '../keys';
import { TagsKnexRepository } from '@database/repositories/Tags/TagsKnexRepository';
import { ProductsKnexRepository } from '@database/repositories/Products/ProductsKnexRepository';

container.registerSingleton(InjectableKeys.TagsRepository, TagsKnexRepository);
container.registerSingleton(
  InjectableKeys.ProductsRepository,
  ProductsKnexRepository,
);
